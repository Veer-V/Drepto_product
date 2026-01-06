import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { action } = req.query;

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await prisma.$connect();

        // ==========================================
        // PRODUCTS (GET / POST)
        // ==========================================
        if (action === 'products') {
            if (req.method === 'GET') {
                const products = await prisma.product.findMany();
                return res.status(200).json(products);
            }
            else if (req.method === 'POST') {
                const { name, description, price, mrp, images, category } = req.body;
                if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

                const product = await prisma.product.create({
                    data: {
                        name,
                        description: description || '',
                        price: parseFloat(price),
                        mrp: parseFloat(mrp) || parseFloat(price),
                        images: images || [],
                        category: category || 'General',
                    },
                });
                return res.status(201).json(product);
            }
            return res.status(405).json({ message: 'Method not allowed' });
        }

        // ==========================================
        // CART CALCULATE (POST)
        // ==========================================
        else if (action === 'calculate-cart') {
            if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

            const { items, couponCode } = req.body;
            const cookies = parse(req.headers.cookie || '');
            const token = cookies.token;
            let user = null;

            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
                    user = await prisma.user.findUnique({ where: { id: decoded.userId } });
                } catch (e) { /* invalid token */ }
            }

            let total = 0;
            let message = '';

            for (const item of items) {
                if (item.id) {
                    const product = await prisma.product.findUnique({ where: { id: item.id } });
                    if (product) total += product.price * (item.quantity || 1);
                } else if (item.price) {
                    total += item.price * (item.quantity || 1);
                }
            }

            if (couponCode === 'FIRSTFREE') {
                if (user && user.isFirstOrder) {
                    total = 0;
                    message = 'You are the first customer so we are giving you a free of cost!';
                } else if (!user) {
                    message = 'Please login/register to use this coupon.';
                } else {
                    message = 'This coupon is only valid for first orders.';
                }
            }
            return res.status(200).json({ total, message });
        }

        // ==========================================
        // PLACE ORDER (POST)
        // ==========================================
        else if (action === 'place-order') {
            if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

            const { items, couponCode } = req.body;
            const cookies = parse(req.headers.cookie || '');
            const token = cookies.token;
            if (!token) return res.status(401).json({ message: 'Unauthorized' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user) return res.status(404).json({ message: 'User not found' });

            let total = 0;
            let finalOrderItems = [];

            for (const item of items) {
                const product = await prisma.product.findUnique({ where: { id: item.id } });
                if (!product) continue;
                const quantity = item.quantity || 1;
                total += product.price * quantity;
                finalOrderItems.push({ productId: product.id, quantity, price: product.price });
            }

            let discount = 0;
            let finalPrice = total;
            let appliedCoupon = null;

            if (couponCode === 'FIRSTFREE' && user.isFirstOrder) {
                discount = total;
                finalPrice = 0;
                appliedCoupon = 'FIRSTFREE';
            }

            const order = await prisma.order.create({
                data: {
                    userId: user.id,
                    total,
                    discount,
                    finalPrice,
                    coupon: appliedCoupon,
                    status: 'COMPLETED',
                    items: { create: finalOrderItems },
                },
            });

            if (user.isFirstOrder && appliedCoupon === 'FIRSTFREE') {
                await prisma.user.update({ where: { id: user.id }, data: { isFirstOrder: false } });
            }

            return res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
        }

        // ==========================================
        // SYNC CART (POST)
        // ==========================================
        else if (action === 'sync-cart') {
            if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

            const { items } = req.body;
            const cookies = parse(req.headers.cookie || '');
            const token = cookies.token;

            if (!token) return res.status(200).json({ message: 'Guest cart not saved' });

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
                const userId = decoded.userId;

                let cart = await prisma.cart.findUnique({ where: { userId } });
                if (!cart) cart = await prisma.cart.create({ data: { userId } });

                // Use transaction on the same instance
                await prisma.$transaction(async (tx: any) => {
                    await tx.cartItem.deleteMany({ where: { cartId: cart!.id } });
                    for (const item of items) {
                        const product = await prisma.product.findUnique({ where: { id: item.id } });
                        if (product) {
                            await tx.cartItem.create({
                                data: { cartId: cart!.id, productId: item.id, quantity: item.quantity || 1 },
                            });
                        }
                    }
                });
                return res.status(200).json({ message: 'Cart synced' });
            } catch (e) {
                console.error('Cart Sync Error', e);
                // Return 200 even on error to prevent UI crash
                return res.status(200).json({ message: 'Failed to sync cart but continuing' });
            }
        }

        // ==========================================
        // SUBSCRIPTION (POST)
        // ==========================================
        else if (action === 'subscribe') {
            if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

            const { plan } = req.body;
            const cookies = parse(req.headers.cookie || '');
            const token = cookies.token;
            if (!token) return res.status(401).json({ message: 'Unauthorized' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const startDate = new Date();
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 1);

            const subscription = await prisma.subscription.create({
                data: {
                    userId: user.id,
                    plan: plan || 'Standard',
                    status: 'Active',
                    startDate,
                    endDate,
                    userName: `${user.firstName} ${user.lastName}`,
                    userEmail: user.email,
                    userContact: user.phoneNumber || 'Not Provided',
                },
            });

            return res.status(201).json({ message: 'Subscribed successfully', subscription });
        }

        else {
            return res.status(400).json({ message: `Invalid action: ${action}` });
        }

    } catch (error: any) {
        console.error(`Shop API Error (${action}):`, error);
        return res.status(500).json({ message: `Shop Action Failed: ${error.message}`, details: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

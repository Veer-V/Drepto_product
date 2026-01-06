import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { items, couponCode } = req.body;

  // Authentication
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;
  let user = null;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!user) return res.status(404).json({ message: 'User not found' });

  // Calculate Totals & Verify Items
  let total = 0;
  let finalOrderItems = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.id } });
    if (!product) continue;

    const quantity = item.quantity || 1;
    total += product.price * quantity;

    finalOrderItems.push({
      productId: product.id,
      quantity: quantity,
      price: product.price,
    });
  }

  let discount = 0;
  let finalPrice = total;
  let appliedCoupon = null;

  // Coupon Logic
  if (couponCode === 'FIRSTFREE') {
    if (user.isFirstOrder) {
      discount = total;
      finalPrice = 0;
      appliedCoupon = 'FIRSTFREE';
    }
  }

  try {
    // Create Order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: total,
        discount: discount,
        finalPrice: finalPrice,
        coupon: appliedCoupon,
        status: 'COMPLETED', // Auto-complete for now
        items: {
          create: finalOrderItems,
        },
      },
    });

    // Update User First Order Status
    if (user.isFirstOrder && appliedCoupon === 'FIRSTFREE') {
      await prisma.user.update({
        where: { id: user.id },
        data: { isFirstOrder: false },
      });
    }

    return res
      .status(201)
      .json({ message: 'Order placed successfully', orderId: order.id });
  } catch (e: any) {
    console.error('Order Error:', e);
    return res.status(500).json({
      message: `Order Failed: ${e.message}`,
      stack: e.stack,
    });
  }
}

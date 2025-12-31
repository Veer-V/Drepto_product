import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

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

  const { items } = req.body; // items: { id: string, quantity: number }[]

  // Authentication
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) return res.status(200).json({ message: 'Guest cart not saved' }); // Allow guest but don't save

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userId = decoded.userId;

    // Sync logic: Overwrite cart for simplicity or merge?
    // User asked "if the user is adding ... he should be also recorded".
    // We will replace the cart items with the current frontend state.

    // Find or create cart
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // Transaction to replace items
    await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.cartItem.deleteMany({ where: { cartId: cart!.id } });

      // Add new items
      for (const item of items) {
        // Verify product exists
        const product = await prisma.product.findUnique({
          where: { id: item.id },
        });
        if (product) {
          await tx.cartItem.create({
            data: {
              cartId: cart!.id,
              productId: item.id,
              quantity: item.quantity || 1,
            },
          });
        }
      }
    });

    return res.status(200).json({ message: 'Cart synced' });
  } catch (e) {
    console.error('Cart Sync Error', e);
    return res.status(500).json({ message: 'Failed to sync cart' });
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';

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

  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      console.error('Fetch products error:', error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  } else if (req.method === 'POST') {
    const { name, description, price, mrp, images, category } = req.body;

    // Basic validation
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
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
    } catch (error) {
      console.error('Create product error:', error);
      return res.status(500).json({ message: 'Failed to create product' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

import { createHandler } from '../../lib/api-handler';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';

export default createHandler(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!process.env.JWT_SECRET) {
    console.error('SERVER ERROR: JWT_SECRET is missing');
    return res
      .status(500)
      .json({ message: 'Configuration Error: Server is misconfigured' });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Use findFirst to match either email or phone number
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber: email }],
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );

  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }),
  );

  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isFirstOrder: user.isFirstOrder,
    },
    token,
  });
});

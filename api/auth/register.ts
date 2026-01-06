import { createHandler } from '../../lib/api-handler';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default createHandler(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, firstName, lastName, phone, gender, age } = req.body;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !phone ||
    !gender ||
    !age
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber: phone,
      gender,
      age: age ? parseInt(age) : null,
      isFirstOrder: true, // First customer logic
    },
  });

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

  return res.status(201).json({
    message: 'User registered successfully',
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

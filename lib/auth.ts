import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from './db';
const SECRET = process.env.JWT_SECRET_KEY || 'use_an_ENV_VAR';

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET);
  return token;
};

export const getUserFromToken = async (header?: string) => {
  if (!header) {
    return null;
  }

  const token = (header.split('Bearer')[1] ?? '').trim();
  let id: string;

  try {
    const user = jwt.verify(token, SECRET) as { id: string };
    id = user.id;
  } catch (e) {
    console.error('invalid jwt', e);
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await prisma.user.findUnique({
    where: { email },
  });

  if (!match) return null;

  const correctPW = await comparePW(password, match.password);

  if (!correctPW) {
    return null;
  }

  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;

  return { user, token };
};

export const signup = async ({
    name,
  email,
  password,
}: {
    name: string;
  email: string;
  password: string;
}) => {
  const hashedPW = await hashPW(password);
  const user = await prisma.user.create({
    data: {
        name,
      email,
      password: hashedPW,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const token = createTokenForUser(user.id);

  return { user, token };
};

const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW);
};

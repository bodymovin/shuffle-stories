import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { db } from './db.server';
import { hash } from './password.server';

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const createUser = async (
  email: string,
  name: string,
  password: string,
): Promise<User | null> => {
  try {
    const hashedPassword = await hash(password);
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    // TODO handle error types
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // User already exists
        console.log('USER ALREADY EXISTS');
      }
    }
    return null;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  const updatedUser = await db.user.update({
    data: user,
    where: {
      id: user.id,
    },
  });
  return updatedUser;
};

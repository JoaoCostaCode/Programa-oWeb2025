import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { CreateUserDto, UpdateUserDto } from '../types/user'

const prisma = new PrismaClient()

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    include: {
      major: true,
      // gameSessions: true
    }
  })
}

export const createUser = async (newUser: CreateUserDto): Promise<User> => {
  const hashedPassword = await bcrypt.hash(newUser.password, 10)

  return prisma.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      major_id: newUser.major_id
    }
  })
}

export const getUser = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      major: true,
      // gameSessions: true
    }
  })
}

export const updateUser = async (
  id: string,
  userData: UpdateUserDto
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: userData
  })
}

export const removeUser = async (id: string): Promise<User> => {
  return prisma.user.delete({ where: { id } })
}

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return null

  const passwordValid = await bcrypt.compare(password, user.password)
  if (!passwordValid) return null

  return user
}


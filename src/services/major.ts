import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major'

const prisma = new PrismaClient()

export const getAllMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany()
}

export const createMajor = async (newMajor: CreateMajorDto): Promise<Major> => {
  return prisma.major.create({ data: newMajor })
}

export const getMajor = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } })
}

export const updateMajor = async (id: string, major: UpdateMajorDto): Promise<Major> => {
  return prisma.major.update({ where: { id }, data: major })
}

export const removeMajor = async (id: string): Promise<Major> => {
  return prisma.major.delete({ where: { id } })
}

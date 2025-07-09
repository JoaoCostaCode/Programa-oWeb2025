import { User } from '@prisma/client'

export type CreateUserDto = Pick<User, 'name' | 'email' | 'major_id' | 'password'>

export type UpdateUserDto = Partial<Pick<User, 'name' | 'email' | 'major_id' | 'password'>>

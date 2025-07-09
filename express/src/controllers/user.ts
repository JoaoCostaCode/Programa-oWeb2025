import { Request, Response } from 'express'
import * as majorService from '../services/major'
import * as service from '../services/user'
import { request } from 'http'

const index = async (req: Request, res: Response) => {
  const users = await service.getAllUsers()
  res.render('user/index', { users })
}

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const majors = await majorService.getAllMajors()
    return res.render('user/create', { majors }) // mostra formulário com dropdown
  }

  const { name, email, password, confirmPassword, major_id } = req.body

  // Verificação de senha
  if (password !== confirmPassword) {
    const majors = await majorService.getAllMajors()
    return res.render('user/create', {
      majors,
      error: 'As senhas não coincidem!',
      form: { name, email }
    })
  }

  try {
    await service.createUser({ name, email, password, major_id })
    res.redirect('/user/index')
  } catch (err) {
    res.status(500).send('Erro ao criar usuário: ' + err)
  }
}



const read = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await service.getUser(id)
  res.render('user/read', { user })
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params

  if (req.method === 'GET') {
    const user = await service.getUser(id)
    const majors = await majorService.getAllMajors()
    return res.render('user/update', { user, majors })
  }

  try {
    await service.updateUser(id, req.body)
    res.redirect('/user/index')
  } catch (err) {
    res.status(500).send(err)
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  await service.removeUser(id)
  res.redirect('/user/index')
}

const login = async (req: Request, res: Response) => {
  const users = await service.getAllUsers()
  res.render('user/login', { users })
}

export default { index, create, read, update, remove, login }

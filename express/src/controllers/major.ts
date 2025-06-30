import { Request, Response } from 'express'
import * as service from '../services/major'

const index = async (req: Request, res: Response) => {
  const majors = await service.getAllMajors()
  res.render('major/index', { majors })
}

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    return res.render('major/create')
  }

  try {
    await service.createMajor(req.body)
    res.redirect('/major')
  } catch (err) {
    res.status(500).send(err)
  }
}

const read = async (req: Request, res: Response) => {
  const { id } = req.params
  const major = await service.getMajor(id)
  res.render('major/read', { major })
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params

  if (req.method === 'GET') {
    const major = await service.getMajor(id)
    return res.render('major/update', { major })
  }

  await service.updateMajor(id, req.body)
  res.redirect('/major')
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  await service.removeMajor(id)
  res.redirect('/major')
}

export default { index, create, read, update, remove }

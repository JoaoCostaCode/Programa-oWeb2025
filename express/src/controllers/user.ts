import { Request, Response } from 'express'
import * as majorService from '../services/major'
import * as service from '../services/user'
import bcrypt from 'bcrypt'
import { PrismaClient, User } from '@prisma/client'


const prisma = new PrismaClient()

const index = async (req: Request, res: Response) => {
  const users = await service.getAllUsers()
  res.render('user/index', { users })
}

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const majors = await majorService.getAllMajors()
    return res.render('user/create', { majors }) 
  }

  const { name, email, password, confirmPassword, major_id } = req.body


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
  const { id } = req.params;

  if (req.method === 'GET') {
    const user = await service.getUser(id);
    const majors = await majorService.getAllMajors();
    return res.render('user/update', { user, majors });
  }

  try {
    await service.updateUser(id, req.body);

    const updatedUser = await service.getUser(id);

    (req.session as any).user = updatedUser;

    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
};


const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  await service.removeUser(id)
  res.redirect('/user/index')
}

const showLoginForm = (req: Request, res: Response) => {
  res.render('user/login')
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log('Tentativa de login:', email)

  try {
    const user = await service.validateUser(email, password)
    console.log('Usuário encontrado:', user)

    if (!user) {
      console.log('Login inválido')
      return res.render('user/login', { error: 'Email ou senha inválidos' })
    }

    (req.session as any).user = { id: user.id, name: user.name, email: user.email }
    res.redirect('/')
  } catch (error) {
    res.status(500).send('Erro interno')
  }
}

const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/user/login') 
  })
}

const passwordForm = (req: Request, res: Response) => {
  res.render('user/password'); 
};


const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = (req.session as any).user.id;

  if (!userId) {
    res.status(401).send("Usuário não autenticado");
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    res.status(404).send("Usuário não encontrado");
    return;
  }

  const senhaCorreta = await bcrypt.compare(currentPassword, user.password);
  if (!senhaCorreta) {
    res.status(400).send("Senha atual incorreta");
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).send("Nova senha e confirmação não coincidem");
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  res.redirect("/");
};

export default { index, create, read, update, remove, login, logout, showLoginForm, passwordForm, changePassword }

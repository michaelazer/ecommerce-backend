import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const user = await store.show(req.body.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }

        const newUser = await store.create(user)
        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as Secret)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user: User = {
            email: req.body.email,
            password: req.body.password
        }

        const u = await store.authenticate(user.email, user.password)
        var token = jwt.sign({user: u}, process.env.TOKEN_SECRET as Secret)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default userRoutes
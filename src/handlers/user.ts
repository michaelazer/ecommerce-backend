import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'

const store = new UserStore()

const index = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
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
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret)
        res.json(token)
    } catch (err) {
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
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret)
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.post('/user', authenticate)
    app.delete('/users', destroy)
}

export default userRoutes
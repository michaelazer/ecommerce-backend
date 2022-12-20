import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import jwt, { Secret } from 'jsonwebtoken'

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.body.id)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const orderId: string = req.params.id
        const productId: string = req.body.productId
        const quantity: number = parseInt(req.body.quantity)

        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.post('/orders/:id/products', addProduct)
    app.delete('/orders', destroy)
}

export default orderRoutes
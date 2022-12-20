import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import auth from './auth'

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    try{
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.body.id)
        res.json(order)
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }
}

const create = async (req: Request, res: Response) => {
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
        const orderId: string = req.params.id
        const productId: string = req.body.product_id
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
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', auth, index)
    app.get('/orders/:id', auth, show)
    app.post('/orders', auth, create)
    app.post('/orders/:id/products', auth, addProduct)
    app.delete('/orders', auth, destroy)
}

export default orderRoutes
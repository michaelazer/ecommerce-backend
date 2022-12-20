import client from '../database'

export type Order = {
    id?: string;
    user_id: string;
    status: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {

            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'

            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (userId, status) VALUES($1, $2) RETURNING *'

            const conn = await client.connect()

            const result = await conn
                .query(sql, [o.user_id, o.status])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add new order for user ${o.user_id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, order_id: string, product_id: string): Promise<Order> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(ordersql, [order_id])

            const order = result.rows[0]

            if (order.status !== "open") {
                throw new Error(`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }
        
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'

            const conn = await client.connect()

            const result = await conn
                .query(sql, [quantity, order_id, product_id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'

            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
}
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiTWljaGFlbCIsImxhc3RfbmFtZSI6IkF6ZXIiLCJlbWFpbCI6Im1pY2hhZWwuYXplckB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBQcllEcmg0TzVVSW5Lb2kuMHBaUnU4ajRPdDZvOXJUVE9lUmpzZjJmNlNZSXFqYWhxQTVXIn0sImlhdCI6MTY3MTU3NDEyNn0.SMY2V3WJvWFPQmICBMLDFH-DMPndnHtnXo38I9lOBTI"

describe('Order endpoints', () => {
    it('should create a order', async () => {
        const res = await request
            .post('/orders')
            .send({
                "user_id": "3",
                "status": "open" 
            })
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should get all orders', async () => {
        const res = await request
            .get('/orders')
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should get order with id 1', async () => {
        const res = await request
            .get('/orders/1')
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })
    
    it('should add a product in order 1', async () => {
        const res = await request
            .post('/orders/1/products')
            .send({
                "order_id": "1",
                "product_id": "1",
                "quantity": 5 
            })
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should delete order with id 1', async () => {
        const res = await request
            .delete('/orders')
            .send({
                "id": '1'
            })
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })
})
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiTWljaGFlbCIsImxhc3RfbmFtZSI6IkF6ZXIiLCJlbWFpbCI6Im1pY2hhZWwuYXplckB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBQcllEcmg0TzVVSW5Lb2kuMHBaUnU4ajRPdDZvOXJUVE9lUmpzZjJmNlNZSXFqYWhxQTVXIn0sImlhdCI6MTY3MTU3NDEyNn0.SMY2V3WJvWFPQmICBMLDFH-DMPndnHtnXo38I9lOBTI"

describe('Product endpoints', () => {
    it('should create a product', async () => {
        const res = await request
            .post('/products')
            .send({
                "name": "test_product",
                "price": 200
            })
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should get all products', async () => {
        const res = await request
            .get('/products')
        expect(res.status).toBe(200)
    })

    it('should get product with id 1', async () => {
        const res = await request
            .get('/products/1')
        expect(res.status).toBe(200)
    })

    it('should delete product with id 1', async () => {
        const res = await request
            .delete('/products')
            .send({
                "id": '1'
            })
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })
})
import supertest from 'supertest'
import client from '../../database'
import app from '../../server'

const request = supertest(app)

beforeAll(async () => {
    const sql = "DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1"
    const conn = await client.connect()
    const _result = await conn.query(sql)
    conn.release()
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiTWljaGFlbCIsImxhc3RfbmFtZSI6IkF6ZXIiLCJlbWFpbCI6Im1pY2hhZWwuYXplckB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBQcllEcmg0TzVVSW5Lb2kuMHBaUnU4ajRPdDZvOXJUVE9lUmpzZjJmNlNZSXFqYWhxQTVXIn0sImlhdCI6MTY3MTU3NDEyNn0.SMY2V3WJvWFPQmICBMLDFH-DMPndnHtnXo38I9lOBTI"

describe('User endpoints', () => {
    it('should create a user', async () => {
        const res = await request
            .post('/users')
            .send({
                "first_name": "Michael",
                "last_name": "Azer",
                "email": "michael.azer@test.com",
                "password": "P@$$w0rd"
            })
        expect(res.status).toBe(200)
    })

    it('should signin a user', async () => {
        const res = await request
            .post('/user')
            .send({
                "email": "michael.azer@test.com",
                "password": "P@$$w0rd"
            })
        expect(res.status).toBe(200)
    })

    it('should get all users', async () => {
        const res = await request
            .get('/users')
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should get user with id 1', async () => {
        const res = await request
            .get('/users/1')
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should delete user with id 1', async () => {
        const res = await request
            .delete('/users')
            .send({
                "id": '1'
            })
            .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })
})
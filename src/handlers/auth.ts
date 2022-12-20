import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
        next()
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

export default auth
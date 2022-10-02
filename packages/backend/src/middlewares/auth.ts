import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload, Secret } from 'jsonwebtoken'

const JWT_SECRET: Secret = String(process.env.JWT_SECRET)

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization')

        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            const token = authHeader.split(' ')[1]

            if (token) {
                req.user = String(verify(token, JWT_SECRET))
                next()
            }
        }
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' })
    }

}
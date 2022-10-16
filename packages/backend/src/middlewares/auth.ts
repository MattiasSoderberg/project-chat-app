import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload, Secret } from 'jsonwebtoken'

const JWT_SECRET: Secret = String(process.env.JWT_SECRET)

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization')
        
        if (!authHeader) {
            res.status(401).json({ message: 'Invalid header'})
        }
        
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            const token = authHeader.split(' ')[1]
            
            if (token) {
                req.user = verify(token, JWT_SECRET) as JwtPayload
                next()
            }
        }
    } catch (err) {
        res.status(403).send('Invalid token')
    }

}
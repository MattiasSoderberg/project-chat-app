import { UserCredentials } from '@chat-app/shared'
import { hash, compare } from 'bcryptjs'
import { JwtPayload, sign } from 'jsonwebtoken'
import { createUser, getUserByUsername, getUserByUsernameWithMessages } from '../models/users-repository'

export const saveNewUser = async (userCredentials: UserCredentials) => {
    const { username, password } = userCredentials

    const hashedPassword = await hash(password, 8)
    const date = new Date().toISOString()
    
    return await createUser(username, hashedPassword, date)
    
} 

export const loginUser = async (userCredetials: UserCredentials) => { // TODO fix crash when username and password are empty
    const { username, password } = userCredetials

    const user = await getUserByUsername(username)
    
    if (user) {
        const hashedPassword = String(user.password)
        if (await compare(password, hashedPassword)) {
            return sign({username: user.username, id: user.id}, String(process.env.JWT_SECRET), { expiresIn: '1800s' })
        }
    }
}

export const loadLoggedInUser = async (user: JwtPayload) => {
    const logginUser = await getUserByUsernameWithMessages(user.username)
    return logginUser
}
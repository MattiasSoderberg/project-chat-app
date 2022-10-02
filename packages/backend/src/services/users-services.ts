import { UserCredentials } from '@chat-app/shared'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { createUser, getUserByUsername, getUserByUsernameWithMessages } from '../models/users-repository'

export const saveNewUser = async (userCredentials: UserCredentials) => {
    const { username, password } = userCredentials

    const hashedPassword = await hash(password, 8)
    
    return await createUser(username, hashedPassword)
    
}

export const loginUser = async (userCredetials: UserCredentials) => {
    const { username, password } = userCredetials

    const user = await getUserByUsername(username)
    // const userId = user.rows[0].id
    const hashedPassword = String(user.rows[0].password)

    if (user) {
        if (await compare(password, hashedPassword)) {
            return sign(username, String(process.env.JWT_SECRET))
        }
    }
}

export const loadLoggedInUser = async (username: string) => {
    const user = await getUserByUsernameWithMessages(username)
    return user.rows[0]
}
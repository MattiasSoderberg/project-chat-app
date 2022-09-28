import { hash } from 'bcryptjs'
import { createUser } from '../models/users-repository'

export const saveNewUser = async (body) => {
    const { username, password } = body

    console.log(username, "service")
}
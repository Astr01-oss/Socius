// services/auth.service.ts
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { users } from '../data/users'

const SECRET = 'supersecret'

// Добавляем тип для пользователя
interface User {
  id: number
  phone: string
  password: string
}

class AuthService {
  async register(phone: string, password: string) {
    if (!phone || !password) throw new Error('Заполни поля!')

    const existingUser = users.find(u => u.phone === phone)
    if (existingUser) throw new Error('Пользователь уже существует!')

    const hashedPassword = await bcrypt.hash(password, 7)

    const user: User = {
      id: Date.now(),
      phone: phone,
      password: hashedPassword
    }
    users.push(user)

    return { message: 'Регистрация успешна' }
  }

  async login(phone: string, password: string) {
    const user = users.find(u => u.phone === phone)

    if (!user) throw new Error('Пользователь не найден')

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) throw new Error('Неверный пароль')

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' })

    return {
      token,
      user: {
        id: user.id,
        phone: user.phone
      }
    }
  }

  // НОВЫЙ МЕТОД: Верификация токена
  async verifyToken(token: string) {
    try {
      // Верифицируем токен
      const decoded = jwt.verify(token, SECRET) as { id: number }
      
      // Ищем пользователя по id из токена
      const user = users.find(u => u.id === decoded.id)
      
      if (!user) {
        throw new Error('Пользователь не найден')
      }
      
      // Возвращаем данные пользователя без пароля
      return {
        id: user.id,
        phone: user.phone
      }
    } catch (error: any) {
      // Обработка разных ошибок JWT
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Токен истек')
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Недействительный токен')
      }
      throw error
    }
  }
}

export default new AuthService()
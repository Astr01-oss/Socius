import AuthService from "../services/auth.service"
import { Request, Response } from "express"

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { phone, password } = req.body
      
      if (!phone || !password) {
        return res.status(400).json({ 
          success: false,
          error: "Телефон и пароль обязательны" 
        })
      }
      
      const result = await AuthService.register(phone, password)
      
      res.status(201).json({
        success: true,
        message: result.message
      })
    } catch (e: any) {
      if (e.message === 'Пользователь уже существует!') {
        return res.status(409).json({ 
          success: false,
          error: e.message 
        })
      }
      
      res.status(400).json({ 
        success: false,
        error: e.message 
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { phone, password } = req.body
      
      if (!phone || !password) {
        return res.status(400).json({ 
          success: false,
          error: "Телефон и пароль обязательны" 
        })
      }
      
      const result = await AuthService.login(phone, password)
      
      res.json({
        success: true,
        ...result
      })
    } catch (e: any) {
      if (e.message === 'Пользователь не найден') {
        return res.status(404).json({ 
          success: false,
          error: e.message 
        })
      }
      
      if (e.message === 'Неверный пароль') {
        return res.status(401).json({ 
          success: false,
          error: e.message 
        })
      }
      
      res.status(400).json({ 
        success: false,
        error: e.message 
      })
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]
      
      if (!token) {
        return res.status(401).json({ 
          success: false,
          error: "Токен не предоставлен" 
        })
      }
      
      const user = await AuthService.verifyToken(token)
      
      res.json({
        success: true,
        user
      })
    } catch (e: any) {
      if (e.message === 'Токен истек') {
        return res.status(401).json({ 
          success: false,
          error: "Сессия истекла, войдите снова" 
        })
      }
      
      if (e.message === 'Недействительный токен') {
        return res.status(403).json({ 
          success: false,
          error: "Недействительный токен" 
        })
      }
      
      res.status(401).json({ 
        success: false,
        error: e.message || "Ошибка верификации токена" 
      })
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        message: "Выход выполнен успешно"
      })
    } catch (e: any) {
      res.status(500).json({ 
        success: false,
        error: e.message 
      })
    }
  }
}

export default new AuthController()
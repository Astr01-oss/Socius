import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const SECRET = process.env.JWT_SECRET || 'supersecret';

class AuthService {
  async register(phone: string, password: string) {
    if (!phone || !password) throw new Error('Заполни поля!');

    const client = await pool.connect();
    try {
      // Проверяем существование пользователя
      const existing = await client.query('SELECT id FROM users WHERE phone = $1', [phone]);
      if (existing.rows.length > 0) {
        throw new Error('Пользователь уже существует!');
      }

      const hashedPassword = await bcrypt.hash(password, 7);

      const result = await client.query(
        'INSERT INTO users (phone, password) VALUES ($1, $2) RETURNING id',
        [phone, hashedPassword]
      );

      return { message: 'Регистрация успешна' };
    } finally {
      client.release();
    }
  }

  async login(phone: string, password: string) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT id, phone, password FROM users WHERE phone = $1', [phone]);
      if (result.rows.length === 0) throw new Error('Пользователь не найден');

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Неверный пароль');

      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' });

      return {
        token,
        user: { id: user.id, phone: user.phone }
      };
    } finally {
      client.release();
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET) as { id: number };
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT id, phone FROM users WHERE id = $1', [decoded.id]);
        if (result.rows.length === 0) throw new Error('Пользователь не найден');
        return result.rows[0];
      } finally {
        client.release();
      }
    } catch (error: any) {
      if (error instanceof jwt.TokenExpiredError) throw new Error('Токен истек');
      if (error instanceof jwt.JsonWebTokenError) throw new Error('Недействительный токен');
      throw error;
    }
  }
}

export default new AuthService();
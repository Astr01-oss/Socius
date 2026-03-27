import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import crypto from 'crypto';

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
  async loginWithTelegram(initData: string) {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) throw new Error('Отсутствует hash в initData');
    params.delete('hash');

    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) throw new Error('TELEGRAM_BOT_TOKEN не задан');

    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const hmac = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (hmac !== hash) {
      throw new Error('Неверная подпись данных Telegram');
    }

    const user = JSON.parse(params.get('user') || '{}');
    const telegramId = user.id;
    const telegramUsername = user.username || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'TelegramUser';

    // Ищем или создаем пользователя
    const dbUser = await this.findOrCreateUserByTelegramId(telegramId, telegramUsername);
    
    // Генерируем JWT
    const token = jwt.sign({ id: dbUser.id }, SECRET, { expiresIn: '7d' });

    return {
      token,
      user: { id: dbUser.id, phone: dbUser.phone, telegramId: dbUser.telegram_id }
    };
  }

  private async findOrCreateUserByTelegramId(telegramId: number, username: string) {
    const client = await pool.connect();
    try {
      // Пытаемся найти пользователя с таким telegram_id
      let result = await client.query(
        'SELECT id, phone, telegram_id FROM users WHERE telegram_id = $1',
        [telegramId]
      );
      if (result.rows.length > 0) {
        return result.rows[0];
      }

      // Если не найден, создаем нового пользователя
      // Генерируем уникальный телефон-заглушку (чтобы не нарушать уникальность)
      const dummyPhone = `telegram_${telegramId}`;
      const resultInsert = await client.query(
        'INSERT INTO users (phone, password, telegram_id, telegram_username) VALUES ($1, $2, $3, $4) RETURNING id, phone, telegram_id',
        [dummyPhone, '', telegramId, username]
      );
      return resultInsert.rows[0];
    } finally {
      client.release();
    }
  }
}

export default new AuthService();
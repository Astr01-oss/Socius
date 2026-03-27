import pool from '../config/db';
import AuthService from './auth.service';

type Questionary = {
  name: string;
  age: number;
  gender: string;
  city: string;
  bio?: string;
  interests?: string[];
  photos?: string;
  showGender?: string;
};

class CardService {
  async createCard(token: string, questionaryData: Questionary) {
    const payload = await AuthService.verifyToken(token);
    if (!payload) throw new Error('Неверный токен');

    const client = await pool.connect();
    try {
      // Проверяем, существует ли уже анкета у пользователя
      const existing = await client.query(
        'SELECT id FROM questionnaires WHERE user_id = $1',
        [payload.id]
      );

      if (existing.rows.length > 0) {
        // Обновляем существующую анкету
        await client.query(
          `UPDATE questionnaires SET
            name = $1, age = $2, gender = $3, city = $4, bio = $5, interests = $6, photos = $7, show_gender = $8, updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $9`,
          [
            questionaryData.name,
            questionaryData.age,
            questionaryData.gender,
            questionaryData.city,
            questionaryData.bio || null,
            questionaryData.interests ? JSON.stringify(questionaryData.interests) : null,
            questionaryData.photos || null,
            questionaryData.showGender || null,
            payload.id
          ]
        );
      } else {
        // Создаём новую анкету
        await client.query(
          `INSERT INTO questionnaires
            (user_id, name, age, gender, city, bio, interests, photos, show_gender)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            payload.id,
            questionaryData.name,
            questionaryData.age,
            questionaryData.gender,
            questionaryData.city,
            questionaryData.bio || null,
            questionaryData.interests ? JSON.stringify(questionaryData.interests) : null,
            questionaryData.photos || null,
            questionaryData.showGender || null
          ]
        );
      }

      // Возвращаем обновлённые данные
      const result = await client.query(
        `SELECT name, age, gender, city, bio, interests, photos, show_gender as "showGender"
         FROM questionnaires WHERE user_id = $1`,
        [payload.id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getCard(token: string) {
    const payload = await AuthService.verifyToken(token);
    if (!payload) throw new Error('Неверный токен');

    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT name, age, gender, city, bio, interests, photos, show_gender as "showGender"
         FROM questionnaires WHERE user_id = $1`,
        [payload.id]
      );
      if (result.rows.length === 0) throw new Error('Анкета не заполнена');
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  async getFeed(userId: number, limit: number = 20) {
  const client = await pool.connect();
  try {
    // Получаем свою анкету, чтобы узнать showGender
    const myCard = await client.query(
      `SELECT show_gender as "showGender" FROM questionnaires WHERE user_id = $1`,
      [userId]
    );
    if (myCard.rows.length === 0) {
      throw new Error('Анкета не заполнена');
    }
    const showGender = myCard.rows[0].showGender;

    // Запрос на получение анкет
    const query = `
      SELECT q.user_id, q.name, q.age, q.gender, q.city, q.bio, q.interests, q.photos
      FROM questionnaires q
      WHERE q.user_id != $1
        AND NOT EXISTS (
          SELECT 1 FROM likes l
          WHERE l.user_id = $1 AND l.target_user_id = q.user_id
        )
        AND (
          ($2 = 'Всех') OR
          ($2 = 'Парень' AND q.gender = 'Парень') OR
          ($2 = 'Девушка' AND q.gender = 'Девушка')
        )
      ORDER BY q.created_at DESC
      LIMIT $3
    `;
    const result = await client.query(query, [userId, showGender, limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

async swipe(userId: number, targetUserId: number, action: 'like' | 'dislike') {
  const client = await pool.connect();
  try {
    const existing = await client.query(
      'SELECT id FROM likes WHERE user_id = $1 AND target_user_id = $2',
      [userId, targetUserId]
    );
    if (existing.rows.length > 0) {
      throw new Error('Уже оценено');
    }

    const isLike = action === 'like';
    await client.query(
      'INSERT INTO likes (user_id, target_user_id, is_like) VALUES ($1, $2, $3)',
      [userId, targetUserId, isLike]
    );

    let matched = false;
    if (isLike) {
      const reciprocal = await client.query(
        'SELECT id FROM likes WHERE user_id = $1 AND target_user_id = $2 AND is_like = true',
        [targetUserId, userId]
      );
      if (reciprocal.rows.length > 0) {
        const [user1, user2] = [userId, targetUserId].sort((a,b)=>a-b);
        await client.query(
          'INSERT INTO matches (user1_id, user2_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [user1, user2]
        );
        matched = true;
      }
    }

    return { matched };
  } finally {
    client.release();
  }
}
}

export default new CardService();
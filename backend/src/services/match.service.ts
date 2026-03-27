import pool from '../config/db';

class MatchService {
  async getLikes(userId: number) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT u.id as user_id, q.name, q.age, q.gender, q.city, q.bio, q.interests, q.photos
         FROM likes l
         JOIN users u ON l.user_id = u.id
         LEFT JOIN questionnaires q ON u.id = q.user_id
         WHERE l.target_user_id = $1 AND l.is_like = true`,
        [userId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getMatches(userId: number) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT 
           CASE WHEN m.user1_id = $1 THEN m.user2_id ELSE m.user1_id END as user_id,
           q.name, q.age, q.gender, q.city, q.bio, q.interests, q.photos
         FROM matches m
         JOIN users u ON (u.id = m.user1_id OR u.id = m.user2_id) AND u.id != $1
         LEFT JOIN questionnaires q ON u.id = q.user_id
         WHERE m.user1_id = $1 OR m.user2_id = $1`,
        [userId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default new MatchService();
import pool from '../config/db';

export const getAllUsers = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT u.id, u.phone, q.name, q.age, q.gender, q.city, q.bio, q.interests, q.photos, q.show_gender as "showGender"
      FROM users u
      LEFT JOIN questionnaires q ON u.id = q.user_id
    `);
    return result.rows;
  } finally {
    client.release();
  }
};
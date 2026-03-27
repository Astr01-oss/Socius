import pool from '../config/db';
import 'dotenv/config';

const update = async () => {
  const client = await pool.connect();
  await client.query(`
    ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
  `);
  try {
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS telegram_id BIGINT UNIQUE,
      ADD COLUMN IF NOT EXISTS telegram_username VARCHAR(100)
    `);
    console.log('Таблицы обновлены: добавлены telegram_id и telegram_username');
  } catch (err) {
    console.error('Ошибка обновления таблиц:', err);
  } finally {
    client.release();
    await pool.end();
  }
};

update();
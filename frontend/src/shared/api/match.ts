import { defaultRef } from './config';

export const matchApi = {
  async getLikes() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Нет токена');
    const response = await fetch(`${defaultRef}/matches/likes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.success) return data.data;
    throw new Error(data.error || 'Ошибка получения лайков');
  },

  async getMatches() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Нет токена');
    const response = await fetch(`${defaultRef}/matches/matches`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.success) return data.data;
    throw new Error(data.error || 'Ошибка получения мэтчей');
  }
};
import { defaultRef } from "./config"

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const authAPI = {
  async register(phone: string, password: string) {
    const response = await fetch(`${defaultRef}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    })
    return response.json()
  },

  async login(phone: string, password: string) {
    const response = await fetch(`${defaultRef}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    })
    const data = await response.json()
    
    if (data.success) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    
    return data
  },

  async verify(): Promise<{ id: number; phone: string } | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await fetch(`${defaultRef}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        return data.user;
      } else {
        // Если токен невалиден, удаляем его
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
      }
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  async telegramLogin(initData: string) {
    const response = await fetch(`${defaultRef}/api/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }
}
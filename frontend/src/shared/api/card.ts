import { defaultRef } from "./config"

export const cardApi = {

  async createCard(questionary : any){
    const token = localStorage.getItem('token')
    const response = await fetch(`${defaultRef}/cards/createcard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token,  questionary})
    })
    return response.json()
  },
  async myCard() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Нет токена');

    const response = await fetch(`${defaultRef}/cards/mycard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.success) return data.data;
    else throw new Error(data.error || 'Ошибка получения анкеты');
  }
}
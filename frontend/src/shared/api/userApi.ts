export const BASE_URL = "http://localhost:3000"

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) throw new Error('error')
  return res.json()
}

export async function registerUser(login : string, password : string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {},
    body : JSON.stringify({login, password})
  })
  if (!res.ok) throw new Error('error')
  return res.json()
}
export async function loginUser(login : string, password : string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {},
    body : JSON.stringify({login, password})
  })
  if (!res.ok) throw new Error('error')
  return res.json()
}
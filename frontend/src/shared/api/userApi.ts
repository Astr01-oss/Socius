import { defaultRef } from "./config"

export const getUsers = async () => {
  const res = await
  fetch(`${defaultRef}/users`)
  return res.json()
}
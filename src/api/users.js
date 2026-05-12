import { BASE_URL } from "./constants"

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}
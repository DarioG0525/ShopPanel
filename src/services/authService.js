const BASE_URL = 'https://dummyjson.com'

const DEMO_USER = {
  username: 'dario.gonzalez',
  password: 'DarioGonzalez2026!',
  accessToken: 'demo-dario-token',
  id: 1001,
  firstName: 'Dario',
  lastName: 'Gonzalez',
  email: 'dario.gonzalez@shoppanel.dev',
  image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Dario%20Gonzalez',
}

export async function loginRequest({ username, password }) {
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    return Promise.resolve({ ...DEMO_USER })
  }

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })

  if (!response.ok) {
    throw new Error('Credenciales invalidas. Intenta con un usuario de DummyJSON.')
  }

  return response.json()
}

const KEYS = {
  auth: 'shoppanel_auth',
  orders: 'shoppanel_orders',
}

export function loadAuthFromStorage() {
  const raw = localStorage.getItem(KEYS.auth)
  return raw ? JSON.parse(raw) : null
}

export function saveAuthToStorage(authData) {
  localStorage.setItem(KEYS.auth, JSON.stringify(authData))
}

export function clearAuthStorage() {
  localStorage.removeItem(KEYS.auth)
}

export function loadOrdersFromStorage() {
  const raw = localStorage.getItem(KEYS.orders)
  return raw ? JSON.parse(raw) : []
}

export function saveOrdersToStorage(orders) {
  localStorage.setItem(KEYS.orders, JSON.stringify(orders))
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const ADMIN_TOKEN_KEY = 'the-arzens-admin-token'

function readJsonSafe(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export function getStoredAdminToken() {
  return window.localStorage.getItem(ADMIN_TOKEN_KEY) || ''
}

export function setStoredAdminToken(token: string) {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearStoredAdminToken() {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY)
}

export function getAdminHeaders(): HeadersInit {
  const token = getStoredAdminToken()

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}

export async function request(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers)

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const text = await response.text()
  const data = text ? readJsonSafe(text) ?? text : null

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data && String(data.message)) ||
      (data && typeof data === 'string' ? data : '') ||
      `Request failed with status ${response.status}`

    throw new Error(message)
  }

  return data
}
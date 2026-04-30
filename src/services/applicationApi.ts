import { request } from './httpClient'

export function submitApplication(payload: unknown) {
  return request('/apply', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
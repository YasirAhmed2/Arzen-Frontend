import { getAdminHeaders, request } from './httpClient'

export function loginAdmin(email: string, password: string) {
  return request('/auth/login-admin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function getAdminApplications() {
  return request('/admin/applications', {
    headers: getAdminHeaders(),
  })
}

export function updateAdminApplicationStatus(id: string, status: 'approved' | 'rejected') {
  return request(`/admin/application/${id}`, {
    method: 'PATCH',
    headers: getAdminHeaders(),
    body: JSON.stringify({ status }),
  })
}
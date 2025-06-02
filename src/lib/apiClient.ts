export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type FetchOptions<TBody> = {
  method?: HttpMethod
  body?: TBody
  headers?: HeadersInit
  token?: string
}

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options?: FetchOptions<TBody>
): Promise<TResponse> {
  const { method = 'GET', body, headers = {}, token } = options || {}

  try {
    const res = await fetch(url, {
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      ...(body && {
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    })

    return res.json()
  } catch (error) {
    console.error('Error in apiFetch:', error)
    throw error
  }
}

export const api = {
  get: <TResponse>(url: string, options?: FetchOptions<any>) =>
    apiFetch<TResponse>(url, { method: 'GET', ...options }),
  post: <TResponse>(url: string, options?: FetchOptions<any>) =>
    apiFetch<TResponse>(url, { method: 'POST', ...options }),
  put: <TResponse>(url: string, options?: FetchOptions<any>) =>
    apiFetch<TResponse>(url, { method: 'PUT', ...options }),
  delete: <TResponse>(url: string, options?: FetchOptions<any>) =>
    apiFetch<TResponse>(url, { method: 'DELETE', ...options }),
  patch: <TResponse>(url: string, options?: FetchOptions<any>) =>
    apiFetch<TResponse>(url, { method: 'PATCH', ...options }),
}

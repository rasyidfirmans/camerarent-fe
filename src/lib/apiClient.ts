export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

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
}

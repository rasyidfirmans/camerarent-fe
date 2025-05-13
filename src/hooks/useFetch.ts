import useSWR, { Fetcher } from 'swr'

type FetcherArgs = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  token?: string
}

const useFetch = ({ url, method, token }: FetcherArgs) => {
  const fetcher: Fetcher = async () =>
    await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authentication: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((res) => res.json())
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    fetchedData: data,
    isLoading,
    isError: error,
  }
}

export default useFetch

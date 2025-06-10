import { api } from '@/lib/apiClient'
import { getCookieAccessToken } from '@/lib/getToken'
import React, { createContext, useEffect } from 'react'

type LoginContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  userData: {
    name: string
    email: string
  }
  setUserData: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }>
  >
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userData: {
    name: '',
    email: '',
  },
  setUserData: () => {},
} as LoginContextType)

const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await getCookieAccessToken().then((token) => token)

      const fetchedUserdata = (await api.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
        {
          headers: {
            Accept: 'application/json',
          },
          token: accessToken ? accessToken : undefined,
        }
      )) as { code: number; data: { name: string; email: string } }

      if (fetchedUserdata.code === 200) {
        setIsLoggedIn(true)
        setUserData({
          name: fetchedUserdata.data.name,
          email: fetchedUserdata.data.email,
        })
      }
    }

    fetchUserData()
  }, [])

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContext, LoginContextProvider }

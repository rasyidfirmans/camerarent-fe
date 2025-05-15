import { LoginContext } from '@/context/LoginContext'
import useMediaQuery from '@/hooks/useMediaQuery'
import PersonIcon from '@mui/icons-material/Person' // Adjust the import path based on your library or component location
import { ChevronDown, LogOut, ScanLine, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Button from './Button'
import handleLogout from '@/lib/handleLogout'
import { useRouter } from 'next/navigation'

const menuList = [
  {
    name: 'My Cart',
    icon: <ShoppingCart />,
    path: '/',
  },
  {
    name: 'Transaction',
    icon: <ScanLine />,
    path: '/',
  },
  {
    name: 'Logout',
    icon: <LogOut />,
    path: '/login',
  },
]

const Navbar = () => {
  const [active, setActive] = React.useState(false)
  const { isLoggedIn, setIsLoggedIn, userData } = React.useContext(LoginContext)
  const router = useRouter()
  const nav = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  console.log('isLoggedIn', isLoggedIn)

  useEffect(() => {
    const handleScroll = () => {
      if (nav.current) {
        if (window.scrollY > 0) {
          nav.current.classList.add(
            'bg-white/10',
            'backdrop-blur-sm',
            'shadow-md'
          )
          nav.current.classList.remove('bg-transparent')
        } else {
          nav.current.classList.add('bg-transparent')
          nav.current.classList.remove(
            'bg-white/10',
            'backdrop-blur-sm',
            'shadow-md'
          )
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Logout function
  const logout = async () => {
    setActive(false)
    setIsLoggedIn(false)
    const logoutRes = await handleLogout()
    if (logoutRes?.status) {
      router.push('/login')
    }
  }

  return (
    <nav
      ref={nav}
      className='fixed w-full px-8 md:px-16 py-3 flex justify-between items-center'
    >
      <div className='cursor-pointer'>
        <Link href='/' className='flex items-center gap-x-2 '>
          <Image
            src='/images/logo.png'
            alt='logo'
            width={0}
            height={0}
            sizes='100vw'
            className='w-[35px] h-[35px] md:w-[40px] md:h-[40px]'
          />
          <div className='text-primary-blue'>
            <p className='font-bold text-md md:text-xl'>Camerarent.</p>
            <p className='text-sm md:text-md'>Rent your camera gear now!</p>
          </div>
        </Link>
      </div>

      {isMobile ? (
        <div
          className={`w-[25px] h-[20px] relative cursor-pointer flex flex-col justify-between ${
            active ? 'active' : ''
          }`}
          onClick={() => setActive(!active)}
        >
          <span
            className={`block h-[3px] bg-primary-blue rounded-lg transition ease-in-out duration-300 ${
              active ? 'translate-y-[9px] rotate-45' : ''
            }`}
          ></span>
          <span
            className={`block h-[3px] bg-primary-blue rounded-lg transition ease-in-out duration-300 ${
              active ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block h-[3px] bg-primary-blue rounded-lg transition ease-in-out duration-300 ${
              active ? '-translate-y-[9px] -rotate-45' : ''
            }`}
          ></span>
        </div>
      ) : isLoggedIn ? (
        <div
          onClick={() => {
            setActive(!active)
          }}
          className='flex items-center gap-x-3 pr-3 rounded-full cursor-pointer hover:bg-yellow-100 transition ease-in-out duration-200'
        >
          <div className='bg-primary-yellow size-10 rounded-full flex items-center justify-center text-white font-bold'>
            {userData.name.slice(0, 1)}
          </div>
          <div>
            <p className='font-bold'>{userData.name}</p>
          </div>
          <div>
            <ChevronDown
              className={`text-gray-500 transition ease-in-out duration-300 ${
                active ? '-rotate-180' : ''
              }`}
            />
          </div>
        </div>
      ) : (
        <div className='flex gap-x-3'>
          <Link href='/login'>
            <Button
              type='button'
              variant='bg-transparent w-22 h-11 rounded-xl font-bold text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white active:bg-secondary-blue active:text-white'
            >
              Login
            </Button>
          </Link>
          <Link href='/register'>
            <Button
              type='button'
              variant='bg-primary-blue w-22 h-11 text-white rounded-xl font-bold border-2 border-primary-blue hover:border-secondary-blue hover:bg-secondary-blue'
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}

      {active && (
        <div className='w-[18rem] bg-white p-8 shadow-lg rounded-xl absolute top-18 md:top-20 right-5 md:right-16 z-10'>
          <div className='flex items-center gap-x-3 border-b-1 border-b-gray-600 pb-5'>
            <div className='bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center'>
              <PersonIcon sx={{ color: '#6A7282' }} fontSize='large' />
            </div>
            {isLoggedIn ? (
              <div>
                <p className='font-bold'>{userData.name}</p>
                <p className='text-sm'>{userData.email}</p>
              </div>
            ) : (
              <div>
                <p className='font-bold'>Unauthorized User</p>
                <p className='text-sm'>Please, sign in using your account</p>
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <ul className='mt-5 flex flex-col gap-y-2'>
              {menuList.map((menuItem, index) => (
                <li
                  key={index}
                  className={`px-3 py-3 rounded-xl transition ease-in-out duration-100 cursor-pointer ${
                    menuItem.name === 'Logout'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 active:bg-gray-200'
                      : 'hover:bg-gray-200 active:bg-gray-200'
                  }`}
                >
                  <Link
                    href={menuItem.path}
                    onClick={logout}
                    className='flex items-center gap-x-3'
                  >
                    {menuItem.icon}
                    <p>{menuItem.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex gap-x-2 mt-5'>
              <Link
                href='/login'
                className='w-1/2 h-11 bg-transparent border-2 border-primary-blue text-primary-blue font-bold rounded-xl flex items-center justify-center hover:bg-primary-blue hover:text-white active:bg-secondary-blue active:text-white'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='w-1/2 h-11 bg-transparent border-2 border-primary-yellow text-primary-yellow font-bold rounded-xl flex items-center justify-center hover:bg-primary-yellow hover:text-white active:bg-primary-yellow active:text-white'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar

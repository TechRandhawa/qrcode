import {React,useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase_config'

const Navbar = () => {
  let navigate = useNavigate()
  const logout = async () => {
    const value = await signOut(auth)
    if (!value) {
      console.log('U', value)
      navigate('/')
    } else {
      console.log('login')
    }
  }

   //Login State Check
   const [userlogin, setUserLogin] = useState({})
  //  onAuthStateChanged(auth, (currentUser) => {
  //    setUserLogin(currentUser)
  //  })
   
  return (
    <>
      <div className="bg-gray-900 h-screen w-screen relative overflow-hidden flex flex-col ustify-center ">
        <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
        <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>

        <div className=" h-20 w-screen bg-white bg-opacity-10 rounded-b-2xl shadow-5xl relative z-2 backdrop-filter backdrop-blur-sm">
          <div className="flex py-6 px-2 space-x-2 text-white h-full items-center">
            <button
              className="bg-slate-500 bg-opacity-30 rounded-3xl px-4 py-2"
              onClick={(e) => navigate('generate')}
            >
              Generate
            </button>
            <button
              className="bg-slate-500 bg-opacity-30 rounded-3xl px-4 py-2"
              onClick={(e) => navigate('scanner')}
            >
              Scanner
            </button>
            <button
              className="bg-slate-500 bg-opacity-30 rounded-3xl px-4 py-2"
              onClick={(e) => logout()}
            >
              Logout
            </button>
            <div className='bg-slate-500 bg-opacity-30 rounded-3xl p-2 overflow-auto'>
            {userlogin?.email}
            </div>
          </div>
        </div>
        <div className="w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Navbar

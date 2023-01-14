import { React, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase_config'

const Login = () => {
  let navigate = useNavigate()

  //Login State Check
  const [userlogin, setUserLogin] = useState({})
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUserLogin(currentUser)
  // })

  //login
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [loginCheck, setLoginCheck] = useState(false)
  //login Function
  const login = async () => {
    let user = undefined
    try {
      user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
      notify(error.message)
    }
    if (user.user.email) {
      console.log(values)
      navigate('/main/generate')
    }
    console.log(values)
  }

  //tostify
  const notify = (e) => {
    if (e.includes('Error')) {
      const x = e.indexOf('/')
      const y = e.indexOf(')')
      const m = e.slice(x + 1, y)
      console.log(m)
      toast.error(`! ${m}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
      })
    }
    
  }

  return (
    <>
      <div className="App bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
        <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
        <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          transitionSpeed={4500}
          gyroscope={true}
        >
          <div className="h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-l-pink-500 border-t-green-400 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
            <div className="text-white h-full flex flex-col justify-evenly items-center">
              <div className="font-semibold text-3xl tracking-widest">
                LOGIN
              </div>
              <input
                type="text"
                id="text"
                placeholder="Enter your username"
                name="name"
                className="p-2 w-64 bg-transparent"
                autoComplete="off"
                onChange={(e) =>
                  setValues((email) => ({ ...email, email: e.target.value }))
                }
              />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                className="p-2 w-64 bg-transparent"
                onChange={(e) =>
                  setValues((password) => ({
                    ...password,
                    password: e.target.value,
                  }))
                }
              />
              <div className="flex flex-col justify-center w-64 space-y-2">
                <button
                  className="py-2 rounded-full text-white bg-gray-800"
                  // onClick={(e) => navigate('main/generate')}
                  onClick={() => login()}
                >
                  Login
                </button>
                <button
                  className="py-2 rounded-full text-white bg-gray-800"
                  onClick={(e) => navigate('signup')}
                >
                  Signup
                </button>
              </div>
              {/* login session */}
              {userlogin?.email}
            </div>
          </div>
        </Tilt>
        <div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default Login

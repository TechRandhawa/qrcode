import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db } from '../../../firebase_config'
import { collection, getDocs } from 'firebase/firestore'

const Generator = () => {
  let navigate = useNavigate()
  let path = '/qrcodes'

  //Creating an array
  const [value, setValue] = useState('')
  let tempArr = []
  let streg = ''
  let p = 0
  tempArr = value.split(',')
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].length >= 10 && tempArr[i].length <= 15) {
      streg = streg + 'ture'
    } else {
      streg = streg + 'false'
      p = i + 1
    }
  }

  //generate qrcodes
  const Generate = () => {
    if (streg.includes('false')) {
      console.log('!Invalid Lenght')
      notify(`!Invalid Length at ${p} position`)
    } else if (/[a-zA-Z]/.test(value)) {
      notify(`!Remove Letters, Aren't Accepted`)
      console.log('char')
    } else {
      localStorage.setItem('data', value)
      navigate(path)
    }
  }

  //tostify
  const notify = (e) => {
    toast.error(`${e}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
    })
  }

  //Firestore Database
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'user')
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      // console.log(data)
    }
    getUsers()
  }, [])

  return (
    <>
      <div className="absolute z-10 h-full w-full">
        <div className="py-5 px-2 space-y-5 flex flex-col justify-center">
          <textarea
            name="text"
            id="text"
            className="w-full h-24 p-2 rounded-lg"
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <button
            className="bg-slate-600 p-3 rounded-3xl text-white text-lg"
            onClick={() => Generate()}
          >
            Generate
          </button>
        </div>
        <div>
          {users.map((user) => {
            return(
            <div className='text-white p-3 flex space-x-4'>
              <h1>{user.type}</h1>
              <h1>{user.uid}</h1>
            </div>
            )
          })}
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default Generator

import { React, useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db } from '../../../firebase_config'
import { collection, addDoc } from 'firebase/firestore'

const Scanner = () => {
  const [Value, setValue] = useState('')
  const [Arr, setArr] = useState([])
  const customId = 'custom-id-yes'

  //Creating array
  useEffect(() => {
    let data = 0
    if (Value) {
      data = parseInt(Value, 10)
      if (!Arr.includes(data)) {
        Arr.push(data)
      } else {
        setValue('')
        // alert('! Invalid DATA')
        toast.error(`Value Already Present`, {
          toastId: customId,
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
    console.log(Arr)
  }, [Value])

  //Submit
  const usersCollectionRef = collection(db, 'user')
  const submit = async () => {
    await addDoc(usersCollectionRef,{type: "values",uid: Arr})
  }
  return (
    <>
      <div className="absolute z-10 h-full w-full text-white">
        <div className="flex flex-col justify-center px-8">
          <div className="px-2 flex justify-center">
            <QrReader
              className="w-48"
              key="environment"
              constraints={{ facingMode: 'environment' }}
              // scanDelay={100}
              onResult={(result, error) => {
                if (!!result) {
                  setValue(result?.text)
                }

                if (!!error) {
                  // console.info(error)
                }
              }}
              style={{ width: '100%' }}
            />
          </div>
          <button
            className="bg-slate-400 bg-opacity-30 rounded-3xl px-4 py-2"
            onClick={() => submit()}
          >
            Submit
          </button>
        </div>
        <div className="ml-4">
          <p>{Value}</p>
          {Arr.map((ar) => (
            <span>{ar}</span>
          ))}
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default Scanner

import { React, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const QrCodes = () => {
  let arr = []
  const data = localStorage.getItem('data')
  arr = data.split(',')
  console.log(arr)
  toast.success(`QRCodes Successfully Generated`, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
  })

  return (
    <>
      <div>
        <div className="flex flex-wrap pt-5 px-16 justify-center">
          {arr.map((ar, index) => (
            <div>
              <div className="p-4">
                <QRCode
                  key={index}
                  title="QRCode"
                  value={ar}
                  bgColor="white"
                  fgColor="black"
                  level="L"
                  size={80}
                  //   ('L' 'M' 'Q' 'H')
                />
                <span className="text-[10px]">{ar}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default QrCodes

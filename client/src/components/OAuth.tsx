import React from 'react'
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth"
import app, { auth } from "../firebase.js"
import { FcGoogle } from 'react-icons/fc'

interface auth {
    loading: boolean
}

const OAuth: React.FC<auth> = (props) => {

    const HandleGoogle = async() => {
        const provider = new GoogleAuthProvider();
        const auth =  getAuth(app)
        const result = await signInWithPopup(auth, provider);

        console.log(result);

    };

  return (
    <button
          disabled={props.loading}
          className="p-[10px] mb-2 flex flex-row items-center portrait:w-[102%] gap-3 justify-center font-semibold rounded-md bg-white border border-slate-800 w-[75%] duration-500 hover:scale-x-105"
          onClick={HandleGoogle}
        >
          <FcGoogle className="w-7 h-7" />
          Continue with Google
        </button>
  )
}

export default OAuth
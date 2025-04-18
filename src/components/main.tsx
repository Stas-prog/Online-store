"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"


const Main = (() => {
    const [password, setPassword] = useState('')
    const router = useRouter()
    const click = () => {
        if (password === 'zxcvb') {
            router.push('/homepage')
        } else {
            setPassword('')
        }
    }

    return (
           <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center bg-slate-600 z-50" >
                <div  className=" flex  p-5 w-350 h-200">
                    <div className="flex flex-col gap-4 mt-11">
                        <input
                            className="mt-3 w-max rounded-md py-1"
                            placeholder="Введіть ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />

                        <button
                           className="rounded-3xl text-sm py-3 px-5 bg-blue-600 text-yellow-500 w-full"
                            onClick={click}
                        >Enter
                        </button>
                    </div>
                </div>
            </div >
    );
});

export default Main;


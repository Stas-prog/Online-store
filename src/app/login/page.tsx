'use client'

import { useWixClient } from "@/hooks/useWixClient"
import React, { useState } from "react"
import { LoginState } from "@wix/sdk"
// import loggedIn from "@wix/sdk"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { members } from "@wix/members";


enum MODE {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}


const LoginPage = () => {

 const wixClient = useWixClient()
    const router = useRouter()

//     const isLoggedIn = wixClient.auth.loggedIn()
// console.log(isLoggedIn)
    // if (isLoggedIn) {
    //     router.push("/homepage")
    // }

    const [mode, setMode] = useState(MODE.LOGIN)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailCode, setEmailCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const formTitle =
        mode === MODE.LOGIN ? "Авторизація" :
            mode === MODE.REGISTER ? "Реєстрація" :
                mode === MODE.RESET_PASSWORD ? "Відновіть свій пароль" : "Підтвердіть свій email"
    const buttonTitle =
        mode === MODE.LOGIN ? "Авторизація" :
            mode === MODE.REGISTER ? "Реєстрація" :
                mode === MODE.RESET_PASSWORD ? "Відновити пароль" : "Підтвердити email"


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

    type ResType = {
        loginState: void | StateMachine;
        data: {
            sessionToken: string
        }
    }
           
        let response: ResType
        
        try {
            switch (mode) {
                case MODE.LOGIN:
                    response = await wixClient.auth.login(
                        {
                            email,
                            password,
                        }
                    )                            
                    
                    break;
                case MODE.REGISTER:
                    response = await wixClient.auth.register(
                        {
                            email,
                            password,
                            profile: { nickname: username },
                        }
                    )

                    break;
                case MODE.RESET_PASSWORD:
                    response = await wixClient.auth.sendPasswordResetEmail(
                        email,
                        window.location.href,
                    )
                    setMessage("Перевірте Ваш email на наявність паролю!")

                    break;
                case MODE.EMAIL_VERIFICATION:
                    response = await wixClient.auth.processVerification(
                        { verificationCode: emailCode }
                    )

                    break;
                default:
                    break;
            }
console.log(response)
            switch (response.loginState) {
                case LoginState.SUCCESS :
                    setMessage("Успіх! Ви авторизовані!")
                    const tokens = await wixClient.auth.generateVisitorTokens();
                    console.log(tokens)                    
                    wixClient.auth.setTokens(tokens)
                    Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { expires: 2 })
                    router.push("/homepage")

                    break;
                    
                case LoginState.FAILURE :
                if(response.errorCode==="invalidEmail"||response.errorCode==="invalidPassword"){
                    setError("Не вірний email або пароль!")
                }else if(response.errorCode==="emailAlreadyExists"){
                    setError("Такий email вже існує!")
                }else if(response.errorCode==="resetPassword"){
                    setError("Перезавантажте свій пароль!")
                }else{
                    setError("Щось пішло не так!")
                }
                    break;

                    case LoginState.EMAIL_VERIFICATION_REQUIRED :
                        setMode(MODE.EMAIL_VERIFICATION)
                    case LoginState.OWNER_APPROVAL_REQUIRED :
                        setMode("Ваш акаунт очікує на підтвердження!")

                default:
                    break;
                
            }
        } catch (error) {
            console.log(error)
            setError("Щось пішло не так!")
        } finally {
            setIsLoading(false)
        }

    }

    return <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <h1 className="text=2xl font-semibold">{formTitle}</h1>
            {mode === MODE.REGISTER ? (
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 ">Ім'я користувача</label>
                    <input type="text" name="username" placeholder="Віталій" className="ring-2 ring-gray-300 rounded-md p-4"
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
            ) : null}
            {mode !== MODE.EMAIL_VERIFICATION ? (
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 ">Email</label>
                    <input type="email" name="email" placeholder="vitalii@gmail.com" className="ring-2 ring-gray-300 rounded-md p-4"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 ">Підтвердити код</label>
                    <input type="text" name="emailCode" placeholder="Код" className="ring-2 ring-gray-300 rounded-md p-4"
                        onChange={(e) => setEmailCode(e.target.value)} />
                </div>
            )}
            {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 ">Пароль</label>
                    <input type="password" name="password" placeholder="Введіть свій пароль"
                        className="ring-2 ring-gray-300 rounded-md p-4"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
            ) : null}
            {mode === MODE.LOGIN && <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.RESET_PASSWORD)}>Забули пароль?</div>}
            <button className="rounded-md p-2 bg-z text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
                disabled={isLoading}>{isLoading ? "Завантаження..." : buttonTitle}</button>
            {error && <div className="text-red-600">{error}</div>}
            {mode === MODE.LOGIN && (
                <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>
                    Не зареєстровані?
                </div>
            )}
            {mode === MODE.REGISTER && (
                <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
                    Зареєстровані?
                </div>
            )}
            {mode === MODE.RESET_PASSWORD && (
                <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
                    Повернутися до авторизації
                </div>
            )}
            {message && <div className="text-green-600 text-sm">{message}</div>}
        </form>
    </div >
}

export default LoginPage

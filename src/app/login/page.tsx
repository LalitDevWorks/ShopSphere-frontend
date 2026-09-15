"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            // console.log(data)
            // Server chalu hai, MySQL band है 
            // → Laravel response deta hai (500 error)
            // → response.ok = false
            // → if(!response.ok) wala block chalta hai
            // Storing Token after login is successful
            if (!response.ok) {
                // alert(data.message || "Something went wrong")
                alert("Something went wrong")
                return
            }
            if (data.token) {
                localStorage.setItem("token", data.token)
                console.log("Login successful!")
                router.push("/products")
            }
        }catch(error){
                //Server hi band hai
                // → fetch() fail ho jaati hai, koi response nahi
                // → catch() block chalta hai
            alert("Server se connect nahi ho pa raha — check karo server chalu hai?")
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

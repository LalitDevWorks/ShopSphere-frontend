'use client'

import { useEffect, useState } from "react"

export default function Cart() {
    // cart diplay karane k lia unko pehle store karana padega fr uss pr loop chalega 
    const [cartItems, setItems] = useState<any[]>([])
    const [total_price, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            console.log("Please login first")
        }

        const getCart = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/cart`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await response.json()
                console.log(data);
                if (!response.ok) {
                    console.log("No data found")
                }
                setItems(data.cart)
                setTotalPrice(data.total_price)
            } catch (error) {
                console.log('Something went wrong')
            }
        }
        console.log("Cart page loaded")
        getCart()
    }, []
    )
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="max-w-2xl mx-auto">
                {cartItems.map((cartItem) => (
                    <div key={cartItem.id} className="bg-white rounded-lg shadow p-6 mb-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">{cartItem.product.name}</h2>
                            <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                            <p className="text-blue-600 font-bold">₹{cartItem.product.price}</p>
                        </div>
                    </div>
                ))}
                <div className="bg-white rounded-lg shadow p-6 mt-4">
                    <p className="text-xl font-bold text-right">Total: ₹{total_price}</p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
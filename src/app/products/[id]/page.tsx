'use client'
import { use, useState, useEffect } from "react"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [product, setProduct] = useState<any>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchProduct = async () => {
            //ye function sirf useEffect k andar hi define rahega 
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
                    , {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json"
                        }
                    })
                const data = await response.json()
                if (!data) {
                    console.log(data.message);
                }
                console.log(data)
                setProduct(data.product)
            } catch (error) {
                console.log("Something went wrong");
            }
        }
        fetchProduct()
    }, [id])

    if (!product) return <div>Loading...</div>

    const addToCartHandler = async () => {
        //ye component level pr define hai 
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "product_id": id,
                    "quantity": 1
                })
            })
            const data = await response.json()
            console.log(data)
            console.log("Product added successfully");
        } catch (error) {
            console.log("Something went wrong")
        }

    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-500 mb-6">{product.description}</p>
                <p className="text-blue-600 font-bold text-2xl mb-4">₹{product.price}</p>
                <p className="text-sm text-gray-400 mb-6">Stock: {product.stock_quantity}</p>
                <button onClick={addToCartHandler} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
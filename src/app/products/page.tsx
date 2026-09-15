"use client"
import Link from "next/link"
import {useState, useEffect} from "react"

export default function Products(){
    const [products, setProducts] = useState<any[]>([])

    useEffect(()=> {
        const token = localStorage.getItem("token")
        // fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`,{
        //     headers: {
        //         "Authorization": `Bearer ${token}`,
        //         "Accept": "application/json",
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     setProducts(data.products)
        // })
        // console.log("Page load hua")

        const fetchProducts = async()=>{
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                    headers : {
                        "Authorization": `Bearer ${token}`,
                        "Accept" : "application/json"
                    }
                })
                const data = await response.json()
                console.log(data)
                setProducts(data.products)
            }catch(error){
                console.log(error)
            }
        }
        fetchProducts()
    }, [])
    return(
        <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
                <div key={product.id} className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-500 mb-4">{product.description}</p>
                    <p className="text-blue-600 font-bold text-lg">₹{product.price}</p>
                    <p className="text-sm text-gray-400">Stock: {product.stock_quantity}</p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Add to Cart
                    </button>
                </div>
            </Link>

            ))}
        </div>
        </div>
    )
}
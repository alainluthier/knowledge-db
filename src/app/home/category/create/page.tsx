'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Breadcrumbs from "@/components/breadcrumbs";
import Button from "@/components/Button";
export default function Page(){
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit= async(e:any)=>{
        e.preventDefault()
        setIsLoading(true)
        await fetch('/api/categories', {
            method: 'POST', // Method put is to create
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category, description
            })
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        setIsLoading(false)
        router.push('/home/category')
    }
    return(
        <>
        <Breadcrumbs
        breadcrumbs={[
            { label: 'Categories', href: '/home/category' },
            {
              label: 'Create Category',
              href: '/home/category/create',
              active: true,
            },
          ]}
        />
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium 
                text-gray-900 dark:text-white" htmlFor="category">
                    Category Name
                </label>
                <input value={category} 
                onChange={(e) => setCategory(e.target.value)}
                type="text" id="base-input" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm 
                font-medium text-gray-900 dark:text-white">
                    Description
                </label>
                <textarea value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                id="message" rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(Optional)"></textarea>
            </div>
            <Button text="Add Category"></Button>
        </form>
        </>
    );
}
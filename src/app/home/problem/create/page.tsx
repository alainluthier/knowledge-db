'use client'
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'
import Breadcrumbs from "@/components/breadcrumbs";
import Button from "@/components/Button";
import { Category } from "@prisma/client";

type Response={
    categories:[Category]
}

export default function Page(){
    const [problem, setProblem] = useState('')
    const [solution, setSolution] = useState('')
    const [data,setData] = useState<Response| null> (null)
    const [categoryId, setCategoryId] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        await fetch('/api/problems', {
            method: 'POST', // Method put is to create
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                problem, solution, categoryId
            })
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        setIsLoading(false)
        router.push('/home/problem')
    }
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/categories')
        .then(response => response.json())
        .then(json => setData(json));
      }, []);

    //const categories = getCategories();
    return(
        <>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Problems', href: '/home/problem' },
                    {
                        label: 'Create Problem',
                        href: '/home/problem/create',
                        active: true,
                    },
                ]} />
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium 
                text-gray-900 dark:text-white" htmlFor="problem">
                    Problem Name
                </label>
                <input value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    type="text" id="base-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="mb-4">
                <label htmlFor="solution" className="block mb-2 text-sm 
                font-medium text-gray-900 dark:text-white">
                    Solution
                </label>
                <textarea value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    id="message" rows={4}
                    className="block p-2.5 w-full text-sm 
                    text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700" 
                    placeholder="The solution is ..."></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="category"
                    name="category"
                    onChange={(e) => setCategoryId(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    defaultValue="">
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {data?.categories.map(item => (
                    <option key={item.id}
                    value={item.id}>{item.category}</option>
                ))}
                </select>
                
            </div>
            <Button text="Add Problem"></Button>
        </form>
        </>
    )
}
'use client'

import { Category } from "@/app/lib/definitions"
import { useFormState } from "react-dom"
import Button from "../Button"
import { updateCategory } from "@/app/lib/actions"

export default function FormEditCategory(
    {category}:{
        category: Category
    }
){
    const initialState={errors:{
        category:[''],
        description:['']
      },
      message: ''}
    const updateProductWithId = updateCategory.bind(null, category.id);
    const [state,dispatch] = useFormState(updateProductWithId,initialState)
    return(
        <form action={dispatch}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium 
                text-gray-900 dark:text-white" htmlFor="category">
                    Category Name
                </label>
                <input 
                type="text" 
                id="category" 
                name="category"
                defaultValue={category.category}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="mb-4">
                <label htmlFor="description" 
                className="block mb-2 text-sm 
                font-medium text-gray-900 dark:text-white">
                    Description
                </label>
                <textarea 
                id="description" 
                name="description"
                rows={4}
                defaultValue={category.description}
                className="block p-2.5 w-full text-sm text-gray-900 
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(Optional)"></textarea>
            </div>
            <Button text="Edit Category"></Button>
        </form>
    )
}
'use client'

import { Category, Problem } from "@/app/lib/definitions"
import { useFormState } from "react-dom"
import Button from "../Button"
import { updateProblem } from "@/app/lib/actions"

export default function FormEditProblem(
    {problem,categories}:{
        problem: Problem;
        categories: Category[];
    }
){
    const initialState={errors:{
        problem:[''],
        solution:[''],
        category_id:['']
      },
      message: ''}
    const updateProductWithId = updateProblem.bind(null, problem.id);
    const [state,dispatch] = useFormState(updateProductWithId,initialState)
    return(
        <form action={dispatch}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium 
                text-gray-900 dark:text-white" htmlFor="problem">
                    Problem Name
                </label>
                <input 
                    id="problem"
                    name="problem"
                    type="text" 
                    defaultValue={problem.problem}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                
            </div>
            <div className="mb-4">
                <label htmlFor="solution" className="block mb-2 text-sm 
                font-medium text-gray-900 dark:text-white">
                    Solution
                </label>
                <textarea 
                    id="solution" 
                    name="solution"
                    defaultValue={problem.solution}
                    rows={4}
                    className="block p-2.5 w-full text-sm 
                    text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700" 
                    placeholder="The solution is ..."></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select 
                    id="category_id"
                    name="category_id"
                    className="bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5"
                    defaultValue={problem.category_id}>
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {categories.map(item => (
                    <option key={item.id}
                    value={item.id}>{item.category}</option>
                ))}
                </select>
                
            </div>
            <Button text="Edit Problem"></Button>
        </form>
    );
}
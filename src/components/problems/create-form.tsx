'use client';

import Button from "../Button";
import { createProblem } from "@/app/lib/actions";
import { Category } from "@/app/lib/definitions";
import { useFormState } from 'react-dom';

export default function FormCreateProblem(
    {categories}:
    {categories: Category[]
    }) {
    const initialState={errors:{
        problem:[''],
        solution:[''],
        category_id:['']
      },
      message: ''}
    const [state, dispatch] = useFormState(createProblem, initialState);
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.problem &&
                    state.errors.problem.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="solution" className="block mb-2 text-sm 
                font-medium text-gray-900 dark:text-white">
                    Solution
                </label>
                <textarea 
                    id="solution" 
                    name="solution"
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
                    defaultValue="">
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {categories.map(item => (
                    <option key={item.id}
                    value={item.id}>{item.category}</option>
                ))}
                </select>
                
            </div>
            <Button text="Add Problem"></Button>
        </form>
    );
}
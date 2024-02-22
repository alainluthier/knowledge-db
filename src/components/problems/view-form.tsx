'use client'

import { Category, Problem } from "@/app/lib/definitions"
import { useFormState } from "react-dom"
import Button from "../Button"
import { updateProblem } from "@/app/lib/actions"
import Link from "next/link"

export default function FormViewProblem(
    {problem,categories}:{
        problem: Problem;
        categories: Category[];
    }
){
    return(
        <div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium 
                text-gray-900 dark:text-white" htmlFor="problem">
                    Problem Name
                </label>
                <p>{problem.problem}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="solution" className="block mb-2 text-sm 
                font-medium text-gray-900 dark:text-white">
                    Solution
                </label>
                <p>{problem.solution}</p>
                
            </div>
            
            <Link
          href="/home/problem"
          className="mt-4 w-38 text-white bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-2.5 
        text-center">
        
          Return
          </Link>
        </div>
    );
}
import { DeleteProblem, UpdateProblem, ViewProblem } from "./buttons";
const getProblems = async () =>{
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/problems', { next: { revalidate: 0 } })
    const json = await res.json()
    return json
}
export default async function TableProblems(){
    const problems = await getProblems()
    return(
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Problem
                </th>
                <th scope="col" className="px-6 py-3">
                    Solution
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="relative px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {problems.problems?.map((pro:any)=>(
                <tr key={pro.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {pro.id}
                </th>
                <td className="px-6 py-4">
                    {pro.problem}
                </td>
                <td className="px-6 py-4">
                    {pro.solution}
                </td>
                <td className="px-6 py-4">
                    {pro.category.category}
                </td>
                <td className="flex justify-end gap-2 px-6 py-4">
                    <ViewProblem id={pro.id.toString()}/>
                    <UpdateProblem id={pro.id.toString()}/>
                    <DeleteProblem id={pro.id.toString()}/>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>

    )
}
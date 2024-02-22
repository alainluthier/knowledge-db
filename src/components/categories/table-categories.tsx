import { Category } from "@/app/lib/definitions";
import { DeleteCategory, UpdateCategory } from "./buttons";

export default async function TableCategories(
    {categories}:{
        categories:Category[]
    }
) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((cat:any, i: number ) => (
                        <tr key={cat.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i+1}
                            </th>
                            <td className="px-6 py-4">
                                {cat.category}
                            </td>
                            <td className="px-6 py-4">
                                {cat.description}
                            </td>
                            <td className="flex justify-end gap-3 px-6 py-4">
                                <UpdateCategory id={cat.id.toString()} />
                                <DeleteCategory id={cat.id.toString()} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
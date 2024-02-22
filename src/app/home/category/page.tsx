import { CreateCategory } from "@/components/categories/buttons"
import TableCategories from "@/components/categories/table-categories"
import { fetchCategories } from "@/app/lib/data";

export default async function Page() {
    const categories = await fetchCategories();
    return (
        <div>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Categories</h1>
            </div>
            <div className="mt-4 mb-4 flex item-center justify-between gap-2 md:mt-8">
                <CreateCategory/>
            </div>
            
            <TableCategories categories={categories} />
        </div>
    )
}
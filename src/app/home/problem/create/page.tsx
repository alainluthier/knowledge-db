import Breadcrumbs from "@/components/breadcrumbs";
import { fetchCategories } from "@/app/lib/data";
import FormCreateProblem from "@/components/problems/create-form";

export default async function Page(){
    const categories = await fetchCategories();
    
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
            <FormCreateProblem categories = {categories}/>
        </>
    )
}
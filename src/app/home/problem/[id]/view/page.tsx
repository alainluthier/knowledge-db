import { fetchCategories, fetchProblemById } from "@/app/lib/data";
import Breadcrumbs from "@/components/breadcrumbs";
import { notFound } from 'next/navigation';
import FormViewProblem from "@/components/problems/view-form";
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const [problem,categories] = await Promise.all([
        fetchProblemById(id),
        fetchCategories()
    ]);
    if (!problem) {
        notFound();
    }
    return <>
    <Breadcrumbs
        breadcrumbs={[
            { label: 'Problems', href: '/home/problem' },
            {
                label: 'View Problem',
                href: `/home/problem/${id}/view`,
                active: true,
            },
        ]}
    />
    <FormViewProblem problem={problem} categories={categories}/>
</>
}
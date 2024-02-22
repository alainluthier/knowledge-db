import { fetchCategories, fetchProblemById } from "@/app/lib/data";
import Breadcrumbs from "@/components/breadcrumbs";
import FormEditProblem from "@/components/problems/edit-form";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const [problem,categories] = await Promise.all([
        fetchProblemById(id),
        fetchCategories()
    ]);
    if (!problem) {
        notFound();
    }
    return (
        <>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Problems', href: '/home/problem' },
                    {
                        label: 'Edit Problems',
                        href: `/home/problem/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <FormEditProblem categories={categories} problem={problem}/>
        </>
    );
}
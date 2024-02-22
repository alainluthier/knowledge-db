import { fetchCategoryById } from "@/app/lib/data";
import Breadcrumbs from "@/components/breadcrumbs";
import FormEditCategory from "@/components/categories/edit-form";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const category = await fetchCategoryById(id)
    if (!category) {
        notFound();
    }
    return (
        <>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Categories', href: '/home/categories' },
                    {
                        label: 'Edit Category',
                        href: `/home/category/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <FormEditCategory category={category}/>
        </>
    );
}
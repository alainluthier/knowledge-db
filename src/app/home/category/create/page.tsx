import Breadcrumbs from "@/components/breadcrumbs";
import FormCreateCategory from "@/components/categories/create-category";
export default function Page(){
    return(
        <>
        <Breadcrumbs
        breadcrumbs={[
            { label: 'Categories', href: '/home/category' },
            {
              label: 'Create Category',
              href: '/home/category/create',
              active: true,
            },
          ]}
        />
        <FormCreateCategory/>
        </>
    );
}
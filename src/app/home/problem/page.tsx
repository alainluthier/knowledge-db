import { CreateProblem } from "@/components/problems/buttons";
import TableProblems from "@/components/problems/table-problems";
import { fetchProblemPages } from "@/app/lib/data";
import { Suspense } from 'react';
import Search from "@/components/search";
import { ProblemsTableSkeleton } from "@/components/skeletons";
import Pagination from "@/components/problems/pagination";
export default async function Page(
    {searchParams,}:{
        searchParams?:{
            query?:string;
            page?:string;
        }
    }
){
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchProblemPages(query);
    return (
        <div>
            <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Problems</h1>
            </div>
            <div className="mt-4 mb-4 flex item-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search problem..." />
                <CreateProblem/>
            </div>
            <Suspense key={query + currentPage} fallback={<ProblemsTableSkeleton />}>
                <TableProblems query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
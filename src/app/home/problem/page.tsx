import { CreateProblem } from "@/components/problems/buttons";
import TableProblems from "@/components/problems/table-problems";

export default function Page() {
    return (
        <div>
            <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Problems</h1>
            </div>
            <div className="mt-4 mb-4 flex item-center justify-between gap-2 md:mt-8">
                <CreateProblem/>
            </div>
            <TableProblems/>
        </div>
    )
}
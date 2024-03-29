//import { deleteProblem } from '@/app/lib/actions';
import { deleteProblem } from '@/app/lib/actions';
import { EyeIcon,PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateProblem() {
  return (
    <Link
      href="/home/problem/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Problem</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ViewProblem({id}:{id:string}){
  return(
    <Link
    href={`/home/problem/${id}/view`}
    className="rounded-md border p-2 hover:bg-gray-100"
  >
    <EyeIcon className="w-5" />
  </Link>
  )
}

export function UpdateProblem({ id }: { id: string }) {
  return (
    <Link
      href={`/home/problem/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProblem({ id }: { id: string }) {
  const deleteProblemWithId = deleteProblem.bind(null, id);
  return (
    <form action={deleteProblemWithId}
    >
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

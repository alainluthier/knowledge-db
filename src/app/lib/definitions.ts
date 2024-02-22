export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
};

export type ProblemAndCategory ={
    id: string;
    problem: string,
    solution: string,
    category: string
}

export type Category={
    id:string;
    category:string;
    description:string;
}

export type Problem={
    id: string;
    problem: string,
    solution: string,
    category_id: string
}
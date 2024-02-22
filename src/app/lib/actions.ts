'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

const ProblemSchema = z.object({
    id: z.string(),
    problem: z.string(),
    solution: z.string(),
    category_id: z.string()
})

export type State = {
    errors?: {
        problem?: string[];
        solution?: string[];
        category_id?: string[];
    };
    message?: string | null;
};

const CreateProblem = ProblemSchema.omit({ id: true });

export async function createProblem(prevState: State, formData: FormData) {

    const validatedFields = CreateProblem.safeParse({
        problem: formData.get('problem'),
        solution: formData.get('solution'),
        category_id: formData.get('category_id'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Problem.',
        };
    }


    // Prepare data for insertion into the database
    const { problem, solution, category_id } = validatedFields.data;

    // Insert data into the database
    try {
        await sql`
      INSERT INTO problems (problem,solution,category_id)
      VALUES (${problem},${solution},${category_id})
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Problem.',
        };
    }

    revalidatePath('/home/problem');
    redirect('/home/problem');
}

const UpdateProblem = ProblemSchema.omit({id:true})

export async function updateProblem(id: string, prevState: State, formData: FormData){
  const validatedFields = UpdateProblem.safeParse({
    problem: formData.get('problem'),
    solution: formData.get('solution'),
    category_id: formData.get('category_id'),
  })

  if(!validatedFields.success){
    return{
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields Failed to update problem.'
    };
  }

  const{problem,solution,category_id} =validatedFields.data;

  try {
    await sql`
      UPDATE problems set problem=${problem},
      solution=${solution},
      category_id=${category_id}
      where ID =  ${id}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to update problem',
    };
  }
  revalidatePath('/home/problem');
  redirect('/home/problem');
}


export type StateCat={
  errors?:{
    category?:string[];
    description?: string[];
  };
  message?: string | null;
}

const CategorySchema = z.object({
  id:z.string(),
  category:z.string(),
  description:z.string().optional()
})

const CreateCategory = CategorySchema.omit({id:true})

export async function createCategory(prevState: StateCat, formData:FormData){
  const validatedFields = CreateCategory.safeParse({
    category: formData.get('category'),
    description: formData.get('description'),
  })

  if(!validatedFields.success){
    return{
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields Failed to Create category.'
    };
  }

  const{category,description} =validatedFields.data;

  try {
    await sql`
      INSERT INTO categories (category, description)
      VALUES (${category}, ${description})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create category.',
    };
  }
  revalidatePath('/home/category');
  redirect('/home/category');
}

const UpdateCategory = CategorySchema.omit({id:true})

export async function updateCategory(id: string, prevState: StateCat, formData: FormData){
  const validatedFields = UpdateCategory.safeParse({
    category: formData.get('category'),
    description: formData.get('description')
  })
  if(!validatedFields.success){
    return{
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields Failed to update category.'
    };
  }
  const{category,description} =validatedFields.data;
  try {
    await sql`
      UPDATE categories set category=${category},
      description=${description}
      where ID =  ${id}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to update category.',
    };
  }
  revalidatePath('/home/category');
  redirect('/home/category');
}

export async function deleteCategory(id:string){
  try {
    await sql`DELETE FROM categories WHERE id::text = ${id}`;
    revalidatePath('/home/category');
    return { message: 'Deleted Category' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category' };
  }
}

export async function deleteProblem(id:string){
  try {
    await sql`DELETE FROM problems WHERE id::text = ${id}`;
    revalidatePath('/home/problem');
    return { message: 'Deleted Problem' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Problem' };
  }
}
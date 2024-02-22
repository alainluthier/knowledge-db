import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Category, Problem, ProblemAndCategory } from './definitions';
const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProblems(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const problems = await sql<ProblemAndCategory>`
        SELECT
          p.id,
          problem,
          solution,
          category 
        FROM problems p inner join categories c on p.category_id = c.id
        WHERE
          (
          problem ILIKE ${`%${query}%`} OR
          solution ILIKE ${`%${query}%`} OR
          category ILIKE ${`%${query}%`} )
        ORDER BY category DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return problems.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch problems.');
    }
  }


export async function fetchProblemPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
        FROM problems p inner join categories c on p.category_id = c.id
        WHERE
          (
          problem ILIKE ${`%${query}%`} OR
          solution ILIKE ${`%${query}%`} OR
          category ILIKE ${`%${query}%`} )
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
  }

  export async function fetchCategories() {
    try {
      const data = await sql<Category>`
        SELECT
          id,
          category,
          description
        FROM categories
        ORDER BY category ASC
      `;
  
      const categories = data.rows;
      return categories;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all categories.');
    }
  }
  
  export async function fetchCategoryById(id: string) {
    noStore();
    try {
      const data = await sql<Category>`
        SELECT
          id,
          category,
          description
        FROM categories
        WHERE id = ${id};
      `;
  
      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoice.');
    }
  }

  export async function fetchProblemById(id: string) {
    noStore();
    try {
      const data = await sql<Problem>`
        SELECT
          id,
          problem,
          solution,
          category_id
        FROM problems
        WHERE id = ${id};
      `;
  
      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoice.');
    }
  }
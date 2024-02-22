// src/actions/auth.ts

// Ensuring server-side code
'use server';

// Importing necessary modules and components
import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcryptjs from 'bcrypt';
//import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { redirect } from 'next/navigation';
//import { EmailNotVerifiedError } from '@/errors';

// Authenticating function for sign-in
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    // Handling authentication errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    // Throwing other unexpected errors
    throw error;
  }
}

// Defining the schema for sign-up form validation
const signUpSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(3).max(255),
});

// Interface for the sign-up form state
interface SignUpFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}



// Function to handle user logout
export async function logout() {
  return await signOut();
}

type User={
  id:string,
  email:string,
  role:string,
  password:string
}
// Function to find a user by email in the database
export const findUserByEmail = async (email: string) => {
   const user = await prisma.user.findUnique({
    where: {
      email:email,
    }})
    const user2:User ={
      id:user?.id.toString()||'',
      email:user?.email||'',
      role:user?.role||'',
      password:user?.password||''
    }
    return user2;
  };

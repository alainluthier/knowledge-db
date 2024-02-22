// Importing necessary types from NextAuth for configuration
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import { prisma } from './lib/prisma';
import { User } from '@prisma/client';
export async function getUser(email:string) {
    return await prisma.user.findUnique({
      where:{
        email
      }
    })
}

declare module "next-auth" {
  interface Session {
    user: {
      email: string,
      role: string,
    } & DefaultSession["user"]
  }
}

// Creating the configuration object for NextAuth
export const authConfig = {
  trustHost: true,
  
  // Defining custom pages to tailor the authentication experience. Here, we redirect the default sign-in page to '/login'.
  pages: {
    signIn: '/login',
  },
  
  // Configuring callbacks for handling authorization logic during authentication flow.
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Checking if the user is logged in
      const isLoggedIn = !!auth?.user;
      
      // Determining if the user is currently on the dashboard
      const isOnHome = nextUrl.pathname.startsWith('/home');
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; 
      }else if(nextUrl.pathname=='/'){
          return Response.redirect(new URL('/login', nextUrl));
      }
      else if (isLoggedIn) {
          return Response.redirect(new URL('/home/problem', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        if(user.email!=null){
          //console.log(user.email)
          token.user = await getUser(user.email|| '')
        }else{
          token.user=user;
        }
        //
      }
      return token;
    },
    session(sessionArgs) {
     // token only exists when the strategy is jwt and not database, so sessionArgs here will be { session, token }
     // with a database strategy it would be { session, user } 
     if ("token" in sessionArgs) {
        let session = sessionArgs.session;
        if ("user" in sessionArgs.token) {
          const tokenUser = sessionArgs.token.user as User;
          if (tokenUser.id) {
            session.user.email = tokenUser.email;
            session.user.role = tokenUser.role;
            return session;
          }
        }
     }
     return sessionArgs.session;
    },
  },
  
  // Placeholder array for authentication providers. We initialize it as empty for now, adding providers when required.
  providers: [], // We start with an empty array, adding providers as needed
  
} satisfies NextAuthConfig; 
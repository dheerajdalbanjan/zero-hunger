// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login', // Redirect to the login page if not authenticated
  },
});

export const config = { matcher: ["/donate", "/mydonations"] };

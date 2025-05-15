export const isAuthenticated = ({ req }: { req?: any }) => {
    const token = req?.cookies?.get('httpToken')?.value; // Access the cookie directly
    console.log(`Checking authentication. Token found: ${!!token}`); // Log the token status
    return !!token;
  };

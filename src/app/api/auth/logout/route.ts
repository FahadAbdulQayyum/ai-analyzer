import { serialize } from 'cookie';

export async function POST() {
  // Clear the authToken cookie
  const serializedCookie = serialize('httpToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Set the expiration date to a past date
    path: '/',
  });

  console.log('Clearing httpToken cookie'); // Log to confirm the cookie is being cleared

  return new Response(JSON.stringify({ message: 'Logout successful' }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
}
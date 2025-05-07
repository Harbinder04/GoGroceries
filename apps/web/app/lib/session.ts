// import 'server-only';
// import { cookies } from 'next/headers';
// import { encrypt } from '@/app/lib/session';

// export async function deleteSession() {
// 	const cookieStore = await cookies();
// 	cookieStore.delete('token');
// }

// // add proper arguments
// export async function createSession(id: number) {
// 	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

// 	// 2. Encrypt the session ID
// 	// const session = await encrypt({ sessionId, expiresAt });

// 	// 3. Store the session in cookies for optimistic auth checks
// 	const cookieStore = await cookies();
// 	cookieStore.set('token', token, {
// 		httpOnly: true,
// 		secure: true,
// 		expires: expiresAt,
// 		sameSite: 'lax',
// 		path: '/',
// 	});
// }

// src/app/portal/reset-password/page.js
import ResetPasswordClient from './ResetPasswordClient';

export default async function ResetPasswordPage({ searchParams }) {
    // ✅ Await searchParams in Next.js 15+
    const params = await searchParams;
    const uid = params?.uid || '';
    const token = params?.token || '';

    return <ResetPasswordClient uid={uid} token={token} />;
}
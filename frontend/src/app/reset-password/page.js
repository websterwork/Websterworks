import ResetPasswordClient from './ResetPasswordClient';

// Server component wrapper: read searchParams on the server and pass them into
// the client component so the client can safely use client-only hooks.
export default function ResetPasswordPage ( { searchParams } )
{
    const uid = ( searchParams && searchParams.uid ) || '';
    const token = ( searchParams && searchParams.token ) || '';
    return <ResetPasswordClient uid={ uid } token={ token } />;
}

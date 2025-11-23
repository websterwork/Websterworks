"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ResetPasswordPage ()
{
    const search = useSearchParams();
    const router = useRouter();
    const uid = search.get( 'uid' ) || '';
    const token = search.get( 'token' ) || '';

    const [ password, setPassword ] = useState( '' );
    const [ confirm, setConfirm ] = useState( '' );
    const [ message, setMessage ] = useState( null );
    const [ loading, setLoading ] = useState( false );

    const fetchCsrf = async () =>
    {
        try
        {
            const res = await fetch( `${ API_URL }/api/auth/token`, { credentials: "include" } );
            if ( res.ok ) return ( await res.json() ).csrfToken;
        } catch { }
        return null;
    };

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        setMessage( null );
        if ( !password || password.length < 6 ) return setMessage( 'Password too short' );
        if ( password !== confirm ) return setMessage( 'Passwords do not match' );
        setLoading( true );
        try
        {
            const csrf = await fetchCsrf();
            const res = await fetch( `${ API_URL }/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
                credentials: 'include',
                body: JSON.stringify( { userId: uid, token, newPassword: password } ),
            } );
            if ( !res.ok )
            {
                const d = await res.json().catch( () => ( {} ) ); throw new Error( d.message || 'Failed' );
            }
            setMessage( 'Password reset successful — you can now sign in' );
            router.push( '/login' );
        } catch ( err )
        {
            setMessage( err?.message || 'Failed to reset password' );
        } finally { setLoading( false ); }
    };

    if ( !uid || !token ) return ( <div className="max-w-xl mx-auto p-6">Invalid reset link</div> );

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Reset password</h1>
            <form onSubmit={ handleSubmit } className="space-y-4">
                <div>
                    <label className="block text-sm">New password</label>
                    <input value={ password } onChange={ ( e ) => setPassword( e.target.value ) } type="password" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Confirm password</label>
                    <input value={ confirm } onChange={ ( e ) => setConfirm( e.target.value ) } type="password" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <button disabled={ loading } className="bg-blue-600 text-white px-4 py-2 rounded">{ loading ? 'Resetting…' : 'Reset password' }</button>
                </div>
                { message && <p className="text-sm text-red-600">{ message }</p> }
            </form>
        </div>
    );
}

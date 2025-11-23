"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ForgotPasswordPage ()
{
    const router = useRouter();
    const [ identifier, setIdentifier ] = useState( "" );
    const [ preview, setPreview ] = useState( null );
    const [ loading, setLoading ] = useState( false );
    const [ message, setMessage ] = useState( null );

    const fetchCsrf = async () =>
    {
        try
        {
            const res = await fetch( `${ API_URL }/api/auth/token`, { credentials: "include" } );
            if ( res.ok ) return ( await res.json() ).csrfToken;
        } catch { }
        return null;
    };

    const handleLookup = async ( e ) =>
    {
        e?.preventDefault();
        setLoading( true );
        setMessage( null );
        try
        {
            const csrf = await fetchCsrf();
            const res = await fetch( `${ API_URL }/api/auth/forgot-lookup`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-csrf-token": csrf },
                credentials: "include",
                body: JSON.stringify( { identifier } ),
            } );
            if ( !res.ok )
            {
                const data = await res.json().catch( () => ( {} ) );
                throw new Error( data.message || "Not found" );
            }
            const data = await res.json();
            setPreview( data );
        } catch ( err )
        {
            setMessage( err?.message || "Lookup failed" );
        } finally
        {
            setLoading( false );
        }
    };

    const handleConfirm = async () =>
    {
        setLoading( true );
        setMessage( null );
        try
        {
            const csrf = await fetchCsrf();
            const res = await fetch( `${ API_URL }/api/auth/forgot-confirm`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-csrf-token": csrf },
                credentials: "include",
                body: JSON.stringify( { userId: preview.id } ),
            } );
            if ( !res.ok )
            {
                const d = await res.json().catch( () => ( {} ) );
                throw new Error( d.message || "Failed to send" );
            }
            setMessage( "Reset link sent to the email on file." );
            // Optionally redirect to a confirmation page
            setPreview( null );
            setIdentifier( "" );
        } catch ( err )
        {
            setMessage( err?.message || "Failed to send" );
        } finally
        {
            setLoading( false );
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
            { !preview && (
                <form onSubmit={ handleLookup } className="space-y-4">
                    <p className="text-sm text-gray-600">Enter your username or email to find your account.</p>
                    <input value={ identifier } onChange={ ( e ) => setIdentifier( e.target.value ) } placeholder="username or email" className="w-full border rounded px-3 py-2" />
                    <div>
                        <button disabled={ loading } type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{ loading ? 'Searching…' : 'Find account' }</button>
                    </div>
                    { message && <p className="text-sm text-red-600">{ message }</p> }
                </form>
            ) }

            { preview && (
                <div className="space-y-4">
                    <p className="text-sm">Is this your account?</p>
                    <div className="flex items-center gap-4">
                        <img src={ preview.avatarUrl } alt="avatar" className="w-16 h-16 rounded-full" />
                        <div>
                            <div className="font-medium">{ preview.username || 'Unknown' }</div>
                            <div className="text-sm text-gray-600">{ preview.emailMasked }</div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={ handleConfirm } className="bg-green-600 text-white px-4 py-2 rounded">Yes, send reset link</button>
                        <button onClick={ () => setPreview( null ) } className="px-4 py-2 border rounded">No, try again</button>
                    </div>
                    { message && <p className="text-sm text-red-600">{ message }</p> }
                </div>
            ) }
        </div>
    );
}

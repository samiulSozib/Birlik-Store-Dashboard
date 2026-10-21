'use client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ComponentType } from 'react';

// The protected layout supplies its completed check to all page guards.
export const AuthenticatedContext = createContext(false);

const withAuth = (WrappedComponent: ComponentType) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();
        const authenticatedByLayout = useContext(AuthenticatedContext);
        const [authenticatedLocally, setAuthenticatedLocally] = useState(false);

        useEffect(() => {
            if (authenticatedByLayout) return;
            try {
                if (localStorage.getItem('api_token')) {
                    setAuthenticatedLocally(true);
                    return;
                }
            } catch {
                // Storage access may be unavailable.
            }
            router.replace('/auth/login');
        }, [authenticatedByLayout, router]);

        if (!authenticatedByLayout && !authenticatedLocally) {
            return <div role="status" aria-live="polite">Loading...</div>;
        }
        return <WrappedComponent {...props} />;
    };
    AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return AuthComponent;
};

export default withAuth;

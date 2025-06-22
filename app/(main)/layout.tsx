import { Metadata } from 'next';
import Layout from '../../layout/layout';


interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Birlik Store',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Birlik Store',
        url: '',
        description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800,
    },
    icons: {
        icon: '/layout/images/logo.png',
    },
};

export default function AppLayout({ children }: AppLayoutProps) {

    return <Layout>
            {children}
        </Layout>;
}

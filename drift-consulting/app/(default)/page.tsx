import { Metadata } from 'next';
import Home from '@/components/Entry/Home/Home';

export const metadata: Metadata = {
    title: 'Home',
    description: 'International Construction Project Manager with 15+ years experience delivering residential, hospitality, and institutional projects with UK government-level expertise.',
};

// Root page uses same component as /home for consistency
export default function RootPage() {
    return <Home />;
}
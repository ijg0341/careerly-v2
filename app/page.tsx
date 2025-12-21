import { redirect } from 'next/navigation';

// Default landing page - redirects to the main app page
// Change the redirect target here to update the default landing page
const DEFAULT_LANDING_PAGE = '/community';

export default function RootPage() {
  redirect(DEFAULT_LANDING_PAGE);
}

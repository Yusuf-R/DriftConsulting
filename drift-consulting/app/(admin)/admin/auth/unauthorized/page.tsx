// app/admin/auth/unauthorized/page.tsx
export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
                <p className="text-lg text-slate-300 mb-6">
                    You don&apos;t have permission to access this page.
                </p>
                <a
                    href="/admin/protected/dashboard"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                    Go to Dashboard
                </a>
            </div>
        </div>
    );
}
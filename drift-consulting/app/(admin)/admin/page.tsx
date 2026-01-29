import React from 'react';
import {requireRole} from "@/lib/auth/requireRole";

async function Page() {
    const { user } = await requireRole(['admin', 'superAdmin']);
    return (
        <>
            <div>
                <h3>
                    This will handle the rerouting to either dashboard or login page
                </h3>
            </div>
        </>
    );
}

export default Page;
"use client";
import React from 'react'
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
    DehydratedState
} from '@tanstack/react-query'

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useState} from "react";

function ReactQueryProvider({children, dehydratedState}: { children: React.ReactNode, dehydratedState?: DehydratedState; }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={dehydratedState}>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    {children}
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}

export default ReactQueryProvider;
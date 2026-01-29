// drift-consulting/app/(admin)/admin/protected/template.tsx
"use client";
import { motion } from "framer-motion";
import {ReactNode} from "react";

interface TemplateInterface {
    children: ReactNode,
}

export default function Template({ children }: TemplateInterface) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
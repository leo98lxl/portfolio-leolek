"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type StatusProps = { value: string; name: string };

const Status = [
    { value: "read", name: "Have read" },
    { value: "unread", name: "Haven't read" },
];

export default function SortByStatus() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortByStatus = (status: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("status", status);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const current = searchParams.get("status") ?? "";

    return (
        <div>
            <select
                value={current}
                onChange={(e) => handleSortByStatus(e.target.value)}
                className="bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm font-medium rounded-xl px-3 py-1.5 border border-slate-300 dark:border-zinc-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            >
                <option value={""} disabled>
                    Status:
                </option>
                {Status.map((status: StatusProps, index: number) => (<option key={index} value={status.value}>{status.name}</option>))}
            </select>
        </div>
    )
}

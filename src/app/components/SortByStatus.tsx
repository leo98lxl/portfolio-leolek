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
            <select value={current} onChange={(e) => handleSortByStatus(e.target.value)}>
                <option value={""} disabled>
                    Status:
                </option>
                {Status.map((status: StatusProps, index: number) => (<option key={index} value={status.value}>{status.name}</option>))}
            </select>
        </div>
    )
}

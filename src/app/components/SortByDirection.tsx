"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DirectionProps = { value: string; name: string };

const SortDirection = [
    { value: "asc", name: "Ascending" },
    { value: "desc", name: "Descending" },
];

export default function SortByDirection() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortDirection = (direction: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("direction", direction);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const current = searchParams.get("direction") ?? "";

    return (
        <div>
            <select value={current} onChange={(e) => handleSortDirection(e.target.value)}> 
                <option value={""} disabled>
                    Direction:
                </option>
                {SortDirection.map((direction: DirectionProps, index: number) => (<option key={index} value={direction.value}>{direction.name}</option>))}
            </select>
        </div>
    )
}

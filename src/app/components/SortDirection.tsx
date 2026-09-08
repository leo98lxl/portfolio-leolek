"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DirectionProps = { value: string; name: string };

const SortDirection = [
    { value: "asc", name: "Ascending" },
    { value: "dsc", name: "Descending" },
];

export default function SortByType() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortDirection = (sort: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("sort", sort);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <form action="">
                <select onChange={(e) => handleSortDirection(e.target.value)} defaultValue={searchParams.get("type")?.toString()} 
                name="" id="">
                    <option value={""} defaultValue={""}>
                        Sort:
                    </option>
                    {SortDirection.map((orderBy: DirectionProps, index: number) => (<option key={index} value={orderBy.value}>{orderBy.name}</option>))}
                </select>
            </form>
        </div>
    )
}

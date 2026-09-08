"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ItemType = { value: string; name: string };

const Type = [
    { value: "title", name: "title" },
    { value: "author", name: "author" },
    { value: "year", name: "year" },
    { value: "status", name: "status" },
    { value: "rating", name: "rating" },
    { value: "review", name: "review" },
];

export default function SortByType() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortByType = (type: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("type", type);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <form action="">
                <select onChange={(e) => handleSortByType(e.target.value)} defaultValue={searchParams.get("type")?.toString()} 
                name="" id="">
                    <option value={""} defaultValue={""}>
                        Type:
                    </option>
                    {Type.map((type: ItemType, index) => (<option key={index} value={type.value}>{type.name}</option>))}
                </select>
            </form>
        </div>
    )
}

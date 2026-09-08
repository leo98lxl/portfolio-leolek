"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type OrderByProps = { value: string; name: string };

const OrderBy = [
    { value: "title", name: "Title" },
    { value: "author", name: "Author" },
    { value: "year", name: "Year" },
    { value: "status", name: "Status" },
    { value: "rating", name: "Rating" },
    { value: "review", name: "Review" },
];

export default function SortByOrder() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortByOrder = (orderBy: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("order_by", orderBy);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <form action="">
                <select onChange={(e) => handleSortByOrder(e.target.value)} defaultValue=
                {searchParams.get("order_by")?.toString()} name="" id="">
                    <option value={""} defaultValue={""}>
                        Order by:
                    </option>
                    {OrderBy.map((orderBy: OrderByProps, index: number) => (<option key={index} value={orderBy.value}>
                        {orderBy.name}
                    </option>))}
                </select>
            </form>
        </div>
    )
}

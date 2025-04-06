import { getCategoryFollowLevel } from "../../services/apiCategory";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useCategories() {
    const [searchParams] = useSearchParams()
    const level = searchParams.get("level") ? searchParams.get("level") : 1
    const parentName = searchParams.get("parentName") ? searchParams.get("parentName") : "root"
    const { data: categories, isLoading, error } = useQuery({
        "queryKey": ["categories", level, parentName],
        "queryFn": () => getCategoryFollowLevel(parentName, level),
    })

    return { categories, isLoading, error }
}
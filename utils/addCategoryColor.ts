import {totalsType} from "@/models/IBalance";

export const addCategoryColor = (
    data: totalsType[] | undefined,
    CategoryColors: any
) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map(item => ({
        ...item,
        color: CategoryColors[item.category],
        total: Number(item.total),
    }));
};

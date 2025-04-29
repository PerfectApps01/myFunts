import {totalsType} from "@/models/IBalance";

export const addCategoryColor = (data: totalsType[], CategoryColors: any) => {
   return data.map(item => ({
        ...item,
        color: CategoryColors[item.category],
       total: Number(item.total),
    }));
}
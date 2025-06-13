import AppConstants from "@/constants/AppConstants";
import axiosClient from "@/lib/axios";
import { ICard } from "@/types/ClientUI";
import { useQuery } from "@tanstack/react-query";

const fetchAllCards = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
    const [, boardId] = queryKey as [string, string];
    const response = await axiosClient.get<ICard[]>(`${AppConstants.BOARD_PATH}/${boardId}/cards`);
    return response.data;
};

export const useCards = (boardId: string) => {
    return useQuery<ICard[]>({
        queryKey: ['cards', boardId],
        queryFn: fetchAllCards,
        enabled: !!boardId,
        staleTime: 1000 * 60 * 5
    })
}
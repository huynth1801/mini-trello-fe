import AppConstants from "@/constants/AppConstants";
import axiosClient from "@/lib/axios";
import { ICard } from "@/types/ClientUI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateCardInput {
    name: string
    description: string
    createdAt: string
}

const fetchAllCards = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
    const [, boardId] = queryKey as [string, string];
    const response = await axiosClient.get<ICard[]>(`${AppConstants.BOARD_PATH}/${boardId}/cards`);
    return response.data;
};

const createNewCard = async (
  boardId: string,
  data: CreateCardInput
): Promise<ICard> => {
  const response = await axiosClient.post<ICard>(
    `${AppConstants.BOARD_PATH}/${boardId}/cards`,
    data
  );
  return response.data;
}

export const useCards = (boardId: string) => {
    return useQuery<ICard[]>({
        queryKey: ['cards', boardId],
        queryFn: fetchAllCards,
        enabled: !!boardId,
        staleTime: 1000 * 60 * 5
    })
}

export const useCreateCard = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ICard, Error, CreateCardInput>({
    mutationFn: (newCard: CreateCardInput) => createNewCard(boardId, newCard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', boardId] });
    },
  });
};
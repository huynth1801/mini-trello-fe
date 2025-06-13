import AppConstants from "@/constants/AppConstants";
import axiosClient from "@/lib/axios";
import { IBoard } from "@/types/ClientUI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createNewBoard = async (newBoard: Pick<IBoard, 'name' | 'description'>) => {
    const response = await axiosClient.post<IBoard>(AppConstants.BOARD_PATH, newBoard)
    return response.data
}

const fetchAllBoards = async () => {
    const response = await axiosClient.get<IBoard[]>(AppConstants.BOARD_PATH)
    return response.data
}

export const useCreateBoard = () => {
    const queryClient = useQueryClient()

    return useMutation<IBoard, Error, Pick<IBoard, 'name' | 'description'>>({
        mutationFn: createNewBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['boards']})
        }
    })
}

export const useBoards = () => {
    return useQuery<IBoard[]>({
        queryKey: ['boards'],
        queryFn: fetchAllBoards,
        staleTime: 1000 * 60 * 5,

    })
}
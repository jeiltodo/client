import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/goalsApi'; // API 모듈 경로에 맞게 수정
import { individualGoalsQueryKeys } from '../hooks/queryKeys'; // 쿼리 키 모듈 경로에 맞게 수정
import { AxiosError } from 'axios';
import { useToast } from '@jeiltodo/ui/shared';

export const useGetAllIndividualGoals = (params: {
  page: number;
  limit: number;
  nickname?: string;
  title?: string;
  createdAfter?: string;
  createdBefore?: string;
}) => {
  const query = useQuery({
    queryKey: individualGoalsQueryKeys.all,
    queryFn: () => individualGoalsApi.getAllIndividualGoals(params),
  });

  return {
    data: query.data,
    isLoading: query.isLoading
  };
};

export const useDeleteIndividualGoal = (onError: (_error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (goalIds: number[]) => individualGoalsApi.deleteIndividualGoal({ goalIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: individualGoalsQueryKeys.all });
      showToast({ message: '개별 목표 삭제 성공!', type: 'alert', isGroup: false });
    },
    onError: () => {
      showToast({ message: '개별 목표 삭제 실패!', type: 'confirm' });
    },
  });
};

export const useGetAllIndividualGoalTodos = (
  params: { page: number; limit: number },
  goalId: number
) => {
  const query = useQuery({
    queryKey: individualGoalsQueryKeys.detail(goalId), // goalId를 queryKey에 포함
    queryFn: () => individualGoalsApi.getAllIndividualGoalTodos(params, goalId), // goalId를 queryFn에 전달
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
  };
};


export const useDeleteIndividualGoalTodos = (onError: (_error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (todoIds: number[]) => individualGoalsApi.deleteIndividualGoalTodos({ todoIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todo'),
      });
      showToast({ message: '할 일 삭제 성공!', type: 'alert', isGroup: false });
    },
    onError: () => {
      showToast({ message: '할 일 삭제 실패!', type: 'confirm' });
    },
  });
};

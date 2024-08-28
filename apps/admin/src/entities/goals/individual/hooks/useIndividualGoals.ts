import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/goalsApi';
import { individualGoalsQueryKeys } from '../hooks/queryKeys';
import { AxiosError } from 'axios';
import { useToast } from '@jeiltodo/ui/shared';

export const useGetAllIndividualGoals = (params: {
  page: number;
  limit: string | number;
  nickname?: string;
  title?: string;
  createdAfter?: string;
  createdBefore?: string;
  memberId?: number;
}) => {
  return useQuery({
    queryKey: individualGoalsQueryKeys.filters(params),
    queryFn: () => individualGoalsApi.getAllIndividualGoals(params),
    select: (data) => data.data,
  });
};

export const useDeleteIndividualGoal = (
  onError: (_error: AxiosError) => void
) => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (goalIds: number[]) =>
      individualGoalsApi.deleteIndividualGoal({ goalIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: individualGoalsQueryKeys.all });
      showToast({
        message: '개별 목표 삭제 성공!',
        type: 'alert',
        isGroup: false,
      });
    },
    onError: () => {
      showToast({ message: '개별 목표 삭제 실패!', type: 'confirm' });
    },
  });
};

export const useGetAllIndividualGoalTodos = (
  params: { page: number; limit: number | string },
  goalId: number
) => {
  return useQuery({
    queryKey: individualGoalsQueryKeys['detail-filters'](goalId, params),
    queryFn: () => individualGoalsApi.getAllIndividualGoalTodos(params, goalId),
    select: (data) => data.data,
  });
};

export const useDeleteIndividualGoalTodos = (
  onError: (_error: AxiosError) => void
) => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (todoIds: number[]) =>
      individualGoalsApi.deleteIndividualGoalTodos({ todoIds }),
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

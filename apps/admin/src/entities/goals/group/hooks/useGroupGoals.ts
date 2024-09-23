import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { groupGoalsApi } from '../api'; // API 모듈 경로에 맞게 수정
import { groupGoalsQueryKeys } from './queryKeys'; // 쿼리 키 모듈 경로에 맞게 수정

export const useGetAllGroupGoals = (params: {
  page: number;
  limit: number | string;
  groupId?: number;
  nickname?: string;
  groupName?: string;
  title?: string;
  createdAfter?: string;
  createdBefore?: string;
}) => {
  return useQuery({
    queryKey: groupGoalsQueryKeys.filters(params),
    queryFn: () => groupGoalsApi.getAllGroupGoals(params),
    select: (data) => data.data,
  });
};

export const useDeleteGroupGoal = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (goalIds: number[]) =>
      groupGoalsApi.deleteGroupGoal({ goalIds }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: groupGoalsQueryKeys.all });
      showToast({
        message: '그룹 목표 삭제 성공!',
        type: 'alert',
        isGroup: false,
      });
    },
    onError: () => {
      showToast({ message: '그룹 목표 삭제 실패!', type: 'confirm' });
    },
  });
};

export const useGetAllGroupGoalTodos = (
  params: { page: number; limit: number | string },
  goalId: number
) => {
  const query = useQuery({
    queryKey: groupGoalsQueryKeys['detail-filters'](goalId, params),
    queryFn: () => groupGoalsApi.getAllGroupGoalTodos(params, goalId),
  });

  return {
    data: query.data?.data,
    isLoading: query.isLoading,
  };
};

export const useDeleteGroupGoalTodos = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (todoIds: number[]) =>
      groupGoalsApi.deleteGroupGoalTodos({ todoIds }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todo'),
      });
      showToast({ message: '할 일 삭제 성공!', type: 'alert', isGroup: false });
    },
    onError: () => {
      showToast({ message: '할 일 삭제 실패!', type: 'confirm' });
    },
  });
};

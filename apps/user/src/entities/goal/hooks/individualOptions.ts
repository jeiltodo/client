import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalQueryKeys } from './queryKeys';
import { individualGoalsApi } from '../api/individualGoalsApi';
import { AxiosError } from 'axios';

export const individualGoalsOptions = () =>
  queryOptions({
    queryKey: goalQueryKeys.individual.lists(),
    queryFn: individualGoalsApi.getGoals,
  });

  // 뮤테이션 옵션 및 훅
export const useIndividualGoalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: individualGoalsApi.createGoal,
    onSuccess: () => {
      // 목표 생성 후 개인 목표 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: goalQueryKeys.individual.lists() });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        alert('목표는 30글자 이하로 작성해 주세요.');
      }
    }
  });
};
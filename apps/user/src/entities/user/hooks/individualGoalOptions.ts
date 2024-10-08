import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useToast } from '@jeiltodo/ui/shared';
import { goalQueryKeys } from '../../goal/hooks/queryKey';
import { individualGoalsApi } from '../../goal/api';

export const individualGoalsOptions = () =>
  queryOptions({
    queryKey: goalQueryKeys.individual.lists(),
    queryFn: individualGoalsApi.getGoals,
    select: (data) => data.data.individualGoals,
  });

export const useIndividualGoalMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: individualGoalsApi.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.individual.lists(),
      });
      showToast({ message: '목표 작성 성공!', type: 'alert' });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        showToast({
          message: '목표는 30글자 이하로 작성해 주세요.',
          type: 'confirm',
        });
      }
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { individualGoalsApi } from '../../goal';

export const useEditSingleGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: individualGoalsApi.patchIndividualGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};

export const useDeleteSingleGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: individualGoalsApi.deleteIndividualGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};

export const useCreateSingleGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: individualGoalsApi.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};

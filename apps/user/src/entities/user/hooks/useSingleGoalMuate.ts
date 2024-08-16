import { useMutation } from '@tanstack/react-query';
import { individualGoalsApi } from '../../goal';

export const useEditSingleGoal = () => {
  return useMutation({
    mutationFn: individualGoalsApi.patchIndividualGoal,
  });
};

export const useDeleteSingleGoal = () => {
  return useMutation({
    mutationFn: individualGoalsApi.deleteIndividualGoal,
  });
};

export const useCreateSingleGoal = () => {
  return useMutation({
    mutationFn: individualGoalsApi.createGoal,
  });
};

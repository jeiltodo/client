import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@jeiltodo/ui/shared';
import { individualGoalsApi } from '../../goal/api';

export const useEditSingleGoal = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: individualGoalsApi.patchIndividualGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
      showToast({ message: '목표 수정 성공!', type: 'alert' });
    },
  });
};

export const useDeleteSingleGoal = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: individualGoalsApi.deleteIndividualGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
      showToast({ message: '목표 삭제 성공!', type: 'alert' });
      router.back();
    },
  });
};

export const useCreateSingleGoal = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: individualGoalsApi.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
      showToast({ message: '목표 작성 성공!', type: 'alert' });
    },
  });
};

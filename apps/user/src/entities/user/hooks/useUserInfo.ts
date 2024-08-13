import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from '../queryKeys';
import { getUserInfo } from '../api/getUserInfo';

export const useUserInfo = () => {
  const {
    data: userInfoData,
    error,
    isLoading,
  } = useQuery({
    queryKey: userQueryKeys.all,
    queryFn: getUserInfo,
  });

  return {
    userInfoData,
    error,
    isLoading,
  };
};

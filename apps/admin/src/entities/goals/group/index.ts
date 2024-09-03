export type {
  GroupGoals,
  GroupGoalTodos,
  GroupGoalsQueryParams,
  ResponseGetAllGroupGoals,
  ResponseGetAllGroupGoalTodos,
} from './model/type';

export { groupGoalsApi } from './api/goalsApi';

export { groupGoalsQueryKeys } from './hooks/queryKeys';
export { useGetAllGroupGoals } from './hooks/useGroupGoals';

export { GOALS_GROUP_FILTERS } from './constants/goals-group-filters';

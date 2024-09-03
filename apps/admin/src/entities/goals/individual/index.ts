export type {
  IndividualGoal,
  IndividualGoalTodos,
  IndividualGoalsQueryParams,
  ResponseGetAllIndividualGoals,
  ResponseGetAllIndividualGoalTodos,
  ResponseGetAllIndividualGoalsData,
} from './model/type';

export { individualGoalsApi } from './api/goalsApi';

export { individualGoalsQueryKeys } from './hooks/queryKeys';
export { useGetAllIndividualGoals } from './hooks/useIndividualGoals';

export { GOALS_INDIVIDUAL_FILTERS } from './constants/goals-individual-filters';

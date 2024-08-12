import { client } from '../../../shared';
import { Todo, TodoCreateBody, TodoUpdateBody } from '../model/type';

export const todoApi = {
  // getTodo : async ()=>{  try {
  //     const response = await client.get('/individual/goals');
  //     return response.data;
  //   } catch (error) {
  //     // 오류가 발생한 경우 적절히 처리
  //     console.error('Fail fetch individual goals:', error);
  //     throw error;
  //   }}

  createTodo: async (todoCreateBody: TodoCreateBody) => {
    try {
      const response = await client.post('/todo/create', todoCreateBody);
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail fetch individual goals:', error);
      throw error;
    }
  },

  checkTodo: async (todoId: number) => {
    try {
      const response = await client.patch(`/todo/done/${todoId}`);
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail fetch individual goals:', error);
      throw error;
    }
  },
  updateTodo: async ({ id, title }: TodoUpdateBody) => {
    try {
      const response = await client.patch(`/todo/update/${id}`, {
        title,
      });
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail  updateTodo:', error);
      throw error;
    }
  },
};

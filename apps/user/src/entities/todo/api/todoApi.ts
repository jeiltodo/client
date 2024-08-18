import { client, ResponseWith } from '../../../shared';
import {
  ResponsePageListRecentTodo,
  SingleGoalTodosResponse,
  Todo,
  TodoCreateBody,
  Todos,
  TodoUpdateBody,
} from '../model/type';

export const todoApi = {
  getSingleGoalTodo: async <T>(goalId: number) => {
    try {
      const response = await client.get<ResponseWith<T>>(
        `/todo/list?goalId=${goalId}`
      );

      return response.data;
    } catch (error) {
      console.error('Fail fetch todo:', error);
      throw error;
    }
  },
  createTodo: async (todoCreateBody: TodoCreateBody) => {
    try {
      const response = await client.post('/todo/create', todoCreateBody);
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail createTodo:', error);
      throw error;
    }
  },

  checkTodo: async (todoId: number) => {
    try {
      const response = await client.patch(`/todo/done/${todoId}`);
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail  checkTodo:', error);
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

  deleteTodo: async (todoId: number) => {
    try {
      const response = await client.delete(`/todo/delete/${todoId}`);
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail deleteTodo:', error);
      throw error;
    }
  },

  assignTodo: async (todoId: number) => {
    try {
      const response = await client.patch(`/todo/group/charge/${todoId}`);
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail  assignTodo:', error);
      throw error;
    }
  },

  getRecentTodo: async (params: {
    page: number;
    limit: number;
    goalIds: string;
    isDone: boolean | null | undefined;
  }) => {
    try {
      const response = await client.get<ResponsePageListRecentTodo<Todos>>(
        '/todo/individual/all',
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error('goal API - getRecentTodo error:', error);
      throw error;
    }
  },
};

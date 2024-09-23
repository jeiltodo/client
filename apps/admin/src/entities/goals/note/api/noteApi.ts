import { client } from "@jeiltodo/ui/shared";
import type { ResponseGetNodeDetail } from "../model/type";

export const noteApi = {
  getNoteDetail: async (
    noteId: number
  ) => {
    try {
      const response = await client.get<ResponseGetNodeDetail>(
        `/admin/note/${noteId}`,
  
      );
      return response.data;
    } catch (error) {
      console.error('note API - getNoteDetail error:', error);
      throw error;
    }
  },

  deleteNote: async (noteId: number) => {
    try {
      const response = await client.delete(`/admin/note/delete/${noteId}`);
      return response;
    } catch (error) {
      console.error('Fail to delete note:', error);
      throw error;
    }
  },
}
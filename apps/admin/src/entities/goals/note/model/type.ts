export interface ResponseGetNodeDetail {
  msg: string;
  code: number;
  data: ResponseGetNoteDetailData;
}

export interface ResponseGetNoteDetailData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  linkUrl: string;
  writer: ResponseGetNoteDetailDataWriter;
  todoTitle: string;
}

/*
 *=================================================================
 */

interface ResponseGetNoteDetailDataWriter {
  id: number;
  nickname: string;
}

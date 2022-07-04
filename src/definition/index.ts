export interface CreateData {
  id: string;
  name: string;
}

export interface CreateChannelData {
  data: { createChannel?: CreateData };
}

export interface WriteMessageData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
export interface WriteMessagesData {
  data: { writeMessages?: WriteMessageData };
}

export interface QueryMessageData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface QueryMessagesData {
  data: { queryMessages?: QueryMessageData[] };
}

export interface CellType {
  row: WriteMessageData;
}

export enum ListType {
  Create,
  Message,
}

export interface TaskBody {
  title: string;
  order: number;
  description: string;
  userId: number | string;
  users: string[];
}

export interface TaskByIdBody extends TaskBody {
  columnId: string;
}

export interface Task extends TaskBody {
  _id: string;
  boardId: string;
}

export interface TaskUpdateBody {
  _id: string;
  order: number;
  columnId: string;
}

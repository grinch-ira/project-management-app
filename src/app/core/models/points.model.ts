export interface PointBody {
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export interface PointUpdateBody {
  _id: string;
  done: boolean;
}

export interface PointUpdateSetBody {
  title: string;
  done: boolean;
}
export interface Point extends PointBody {
  _id: string;
}

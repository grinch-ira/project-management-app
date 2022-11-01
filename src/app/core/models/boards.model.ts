export interface Board {
  title: string;
  owner: string;
  users: string[];
}

export interface BoardResponse extends Board {
  _id: string;
}

export interface BoardBody {
  title: string;
  owner: string;
  users: string[];
}

export interface Board extends BoardBody {
  _id: string;
}

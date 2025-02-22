export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin?: string;
}

export interface CompletedUser extends User {
  id: string;
}

export interface TableUser {
  id: string;
  name: string;
  email: string;
}

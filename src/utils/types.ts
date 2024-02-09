export type User = {
  id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  role?: Role;
};

enum Role {
  USER,
  ADMIN,
  DEV,
}

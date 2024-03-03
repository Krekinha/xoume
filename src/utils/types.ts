export type User = {
  id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  roles?: Role[];
};

enum Role {
  ADMIN,
  DEV,
  COLAB,
  FINANCE,
}

export type ILogin = {
  email: string;
  senha: string;
};

export type Sidemenu = {
  modulo?: string;
  menu?: MenuSideList[]
}

export type MenuSideList = {
  nome?: string;
  icon?: string;
  notificacao?: number;
}

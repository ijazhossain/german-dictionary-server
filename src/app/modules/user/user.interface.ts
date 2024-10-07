export type TName = {
  firstName: string;
  lastName: string;
};
export type TUser = {
  name: TName;
  email: string;
  password: string;
  role: 'superAdmin' | 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  passwordChangedAt?: Date;
  isDeleted: boolean;
};

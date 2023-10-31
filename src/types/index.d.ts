interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IAuthenticatedUser {
  name: string;
  email: string;
}

interface ICategory {
  id: string;
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}
interface IColor {
  id: string;
  name: string;
  code: string;
}
interface IIcon {
  id: string;
  name: string;
  symbol: string;
}

interface ICategoryRequest {
  name: string;
  color: IColor;
  icon: IIcon;
}

interface ITask {
  id: string;
  name: string;
  isCompleted: boolean;
  categoryId: string;
  createdAt: string;
  date: string;
}

interface ITaskRequest {
  name: string;
  isCompleted: boolean;
  categoryId: string;
  date: string;
}

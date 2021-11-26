import { User } from ".prisma/client";

export interface IReminder {
  id: String;
  userId: String;
  title: String;
  description: String;
  completed: Boolean;
  createdAt: String;
  updatedAt: String;
}

export interface IUser extends User {
  reminders: IReminder[];
}

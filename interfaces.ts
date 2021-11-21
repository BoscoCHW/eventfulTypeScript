export interface UserInterface {
  id: string;
  email: String;
  name: String;
  password: String;
  role: String;
  imageUrl: String;
  // reminders: 
  createdAt: String;
  updatedAt: String;
}

export interface ReminderInterface {
  id: String;
  userId: String;
  title: String;
  description: String;
  completed: Boolean;
  createdAt: String;
  updatedAt: String;
}


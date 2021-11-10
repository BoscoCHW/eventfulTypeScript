let Database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "123",
      role: 'admin',
      imageUrl: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzQ0MjZ8MXwxfGFsbHwxfHx8fHx8Mnx8MTYzNjUxMzM0Nw&ixlib=rb-1.2.1&q=80&w=200",
      reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "123",
      role: 'user',
      imageUrl: "",
      reminders: []
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "123",
      role: 'user',
      imageUrl: "",
      reminders: []
    }
];


module.exports = Database;
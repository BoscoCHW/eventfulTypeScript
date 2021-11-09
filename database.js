let Database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "123",
      role: 'admin',
      reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "123",
      role: 'user',
      reminders: []
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "123",
      role: 'user',
      reminders: []
    }
];


module.exports = Database;
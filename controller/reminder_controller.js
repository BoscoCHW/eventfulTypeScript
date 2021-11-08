let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {

    const reminderID = Number(req.params.id);
    const updatedReminder = Object.assign({id: reminderID}, req.body);
    updatedReminder.completed = (updatedReminder.completed === "true")
    
    const reminderIndex = database.cindy.reminders.findIndex(reminder => reminder.id === reminderID)
    database.cindy.reminders.splice(reminderIndex, 1, updatedReminder);

    res.redirect("/reminder/" + reminderID);
  },

  delete: (req, res) => {
    const reminderToFind = Number(req.params.id);
    database.cindy.reminders = database.cindy.reminders.filter(reminder => reminder.id !== reminderToFind);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

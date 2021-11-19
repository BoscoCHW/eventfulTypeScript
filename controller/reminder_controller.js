const { reminderModel } = require("../models/reminderModel");

let remindersController = {
  list: async (req, res) => {
    const reminders = await reminderModel.findByUser(req.user.id);
    res.render("reminder/index", { 
      reminders,
      user: req.user.name,
      imageUrl: req.user.imageUrl
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { 
        reminders: req.user.reminders, 
        user: req.user.username, 
        imageUrl: req.user.imageUrl
      });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {

    const reminderID = Number(req.params.id);
    const updatedReminder = Object.assign({id: reminderID}, req.body);
    updatedReminder.completed = (updatedReminder.completed === "true")
    
    const reminderIndex = req.user.reminders.findIndex(reminder => reminder.id === reminderID)
    req.user.reminders.splice(reminderIndex, 1, updatedReminder);

    res.redirect("/reminder/" + reminderID);
  },

  delete: (req, res) => {
    const reminderToFind = Number(req.params.id);
    req.user.reminders = req.user.reminders.filter(reminder => reminder.id !== reminderToFind);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;

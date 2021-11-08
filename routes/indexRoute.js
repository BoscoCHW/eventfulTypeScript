const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");

router.get("/reminders", ensureAuthenticated, reminderController.list);

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/reminder/", reminderController.create);

// Implement this yourself
router.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
router.post("/reminder/delete/:id", reminderController.delete);

module.exports = router;
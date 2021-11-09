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


router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
    const sessions = []
    for (sessionId in req.sessionStore.sessions) {
        const cookie = JSON.parse(req.sessionStore.sessions[sessionId])
        const session = {
            id: sessionId,
            userId: cookie.passport.user
        }
        sessions.push(session)
    }

    return res.render("admin/dashboard", {user: req.user, sessions})
})


router.get("/revokeSession/:id", ensureAuthenticated, isAdmin, (req, res) => {
    const sessionId = req.params.id;
    delete req.sessionStore.sessions[sessionId]
    return res.redirect("/admin")
})

module.exports = router;
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");
const imgur = require("imgur");
const fs = require("fs");
const upload = require("../middleware/multer")
const database = require("../database")

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

router.post("/uploads/", upload.single("image"), async (req, res) => {
    const file = req.file;
    try {
        const url = await imgur.uploadFile(`./uploads/${file.filename}`);
        database.forEach(user => {
            if (user.id === req.user.id) {
                user.imageUrl = url.link;
            }
        });
        res.json({ message: url.link });
        fs.unlinkSync(`./uploads/${file.filename}`);
    } catch (error) {
        console.log("error", error);
    }
  });

module.exports = router;
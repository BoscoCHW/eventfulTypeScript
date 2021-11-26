import express, { Request, Response } from "express";
const router = express.Router();
import { ensureAuthenticated, isAdmin } from "../middleware/checkAuth";
import reminderController from "../controller/reminder_controller";
import imgur from "imgur";
import fs from "fs";
import upload from "../middleware/multer";
import { userModel } from "../models/userModel";

import { IRequest, ISessionStore } from "./indexRoute.interface";

router.get("/reminders", ensureAuthenticated, reminderController.list);

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/reminder/", reminderController.create);
// Implement this yourself
router.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
router.post("/reminder/delete/:id", reminderController.delete);

router.get(
  "/admin",
  ensureAuthenticated,
  isAdmin,
  (req: IRequest, res: Response) => {
    const sessionsArray = [];

    for (const sessionId in req.sessionStore.sessions) {
      const cookie = JSON.parse(req.sessionStore.sessions[sessionId]);
      const session = {
        id: sessionId,
        userId: cookie?.passport?.user,
      };
      sessionsArray.push(session);
    }

    return res.render("admin/dashboard", { user: req.user, sessions: sessionsArray });
  }
);

router.get(
  "/revokeSession/:id",
  ensureAuthenticated,
  isAdmin,
  (req: IRequest, res) => {
    const sessionId = req.params.id;
    delete req.sessionStore.sessions[sessionId];
    return res.redirect("/admin");
  }
);

router.post(
  "/uploads/",
  ensureAuthenticated,
  upload.single("image"),
  async (req: IRequest, res) => {
    const file = req.file;
    try {
      const url = await imgur.uploadFile(`./uploads/${file.filename}`);
      await userModel.updateOne(req.user.id, { imageUrl: url.link });

      res.json({ message: url.link });
      fs.unlinkSync(`./uploads/${file.filename}`);
    } catch (error) {
      console.log("error", error);
    }
  }
);

export default router;

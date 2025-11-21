import express from "express";
import { getAllContacts ,getMessagesByUserId,sendMessage,getChatpartners} from "../contollers/message.controller.js";
import { protectRoute } from "./auth.middelware.js";

const router = express.Router();

router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatpartners);
router.get("/:id",protectRoute,getMessagesByUserId);
router.post("/send/:id",protectRoute,sendMessage);
export default router;
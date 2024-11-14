import { Router } from "express";
import { handleCreateContact, handleGetAllContacts, handleUpdateContact, handleDeleteContact } from "../../controllers/contact.controller";

const router = Router();

router.post("/", handleCreateContact);
router.get("/", handleGetAllContacts);
router.put("/:id", handleUpdateContact);
router.delete("/:id", handleDeleteContact);

export default router;
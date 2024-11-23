import { Router } from "express";
import { getContactByIdController, getContactsContriller } from "../controllers/contacts";
import { ctrlWrapper } from "../utils/ctrlWrapper";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsContriller));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default router;

import { Router } from "express";
import {
    createContactController,
    getContactByIdController,
    getContactsController,
    deleteContactController,
    upsertContactController,
    patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', 
    isValidId,
    ctrlWrapper(getContactByIdController));

router.post('/', 
    //  checkRoles(ROLES.TEACHER),
     isValidId,
     upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactController));

router.delete('/:contactId', 
    isValidId,
    ctrlWrapper(deleteContactController));

router.put('/:contactId', 
    // checkRoles(ROLES.TEACHER),
     isValidId,
     upload.single('photo'),
    validateBody(updateContactSchema),
    ctrlWrapper(upsertContactController));

router.patch('/:contactId', 
    // checkRoles(ROLES.TEACHER, ROLES.PARENT),
     isValidId,
     upload.single('photo'),
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));


export default router;

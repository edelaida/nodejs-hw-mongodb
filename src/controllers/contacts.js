import createHttpError from "http-errors";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact 
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../utils/env.js";
import { saveFileToUpLoaDir } from "../utils/saveFileToUpLoadDir.js";

export const getContactsController = async (req, res, next) => {
  try { 
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}  catch (err) {
  next(err);
}
};
  
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
 
  const contact = await getContactById(contactId, req.user._id);      
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }  
    res.json({
      status: 200,
	message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
};

export const createContactController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
     } else {
          photoUrl = await saveFileToUpLoaDir(photo);
      }
   }
    
    const rezult = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo: photoUrl,
  };
    
  const contact = await createContact(rezult);  

  res.status(201).json({
    statys: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}; 

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params; 
  
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await updateContact(contactId, userId, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(400, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
     } else {
          photoUrl = await saveFileToUpLoaDir(photo);
      }
   }
    
  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,    
  });
 
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};



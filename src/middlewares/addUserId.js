import createHttpError from "http-errors";
import { ContactsCollection } from "../db/models/contact.js";

export const addUserId = async (req, res, next) => {
    const contact = await ContactsCollection.findOne({
        // _id: contactId,
        userId: req.user._id,
      });

      if (contact) {
        next();
        return;
      }
    
    next(createHttpError(403));
}



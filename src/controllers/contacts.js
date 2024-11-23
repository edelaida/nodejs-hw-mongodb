import { getAllContacts, getContactById } from "../services/contacts";


export const getContactsContriller = async (req, res, next) => {
  try { 
    const contacts = await getAllContacts();
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
  const contact = await getContactById(contactId); 
    // if (!contact) {
    //   res.status(400).json({
    //     message: 'Siudent not found'
    //   });
    //   return;
  // };
  if (!contact) {
      next(new Error('Contact not found'))
  }
  
    res.json({
      status: 200,
	message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
};
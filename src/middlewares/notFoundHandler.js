export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ 
      status: 400, 
      message: 'Contact not found',
    });
  };
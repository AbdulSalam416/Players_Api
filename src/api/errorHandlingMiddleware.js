
const errorHandlingMiddleware = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
      const firstError = err.errors[0];
      let errorMessage = {
        message: `Invalid value for ${firstError.path}: ${firstError.value}`,
      }; 
  
      if (firstError.path.includes('playerSkills.')) {
        const field = firstError.path.split('.')[1];
        errorMessage = {
          message: `Invalid value for ${field}: ${firstError.value}`,
        };
      }
  
      return res.status(400).json(errorMessage);
    }
  
   
    return res.status(500).json({ message: '************Internal Server Error***************' });
  };
  
  export default errorHandlingMiddleware;
  
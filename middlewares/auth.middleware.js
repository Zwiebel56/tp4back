export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ error: 'No llegó ningún token en los headers' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, 'secret');
      req.user_id = payload.id; // Modifica el req agregando el user id que viene en el token
      next(); // Pasa al próximo middleware
    } catch (err) {
      console.error(err);
      return res.status(401).send({ error: 'Unauthorized' });
    }
  }
  
  export const verifyAdmin = async (req, res, next) => {} //aca adentro habian (...)
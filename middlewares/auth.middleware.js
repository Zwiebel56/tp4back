import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send({ error: 'No llegó ningún token en los headers' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user_id = payload.id;
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

export const verifyAdmin = async (req, res, next) => {
  if (req.user && req.user.rol === 'A') {
    return next();
  }
  return res.sendStatus(403);
};
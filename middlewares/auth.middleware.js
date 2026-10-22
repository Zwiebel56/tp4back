import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No llegó ningún token en los headers.' });
  }

  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    req.user_id = payload.userid;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.admin === true) {
    return next();
  }
  return res.status(403).json({ error: 'Acceso denegado: requiere permisos de administrador.' });
};
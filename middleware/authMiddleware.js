import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided!' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing!' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.Data = {
      tutorId: decodedToken.id,
    };
    next();
  } catch (error) {
    console.error('Auth failed:', error);
    res.status(401).json({ message: 'Auth failed!' });
  }
};

export default authMiddleware;

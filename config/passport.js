import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import TeacherDb from '../models/teacherModel.js'; 

passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, 
    async (email, password, done) => {
      try {
        const user = await TeacherDb.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'No user found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await TeacherDb.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;

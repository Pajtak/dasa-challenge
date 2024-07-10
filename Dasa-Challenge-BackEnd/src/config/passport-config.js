const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/userModel");

const secret = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id);
      console.log(user);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;

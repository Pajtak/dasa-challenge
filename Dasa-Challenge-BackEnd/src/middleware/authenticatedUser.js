import { JWTPassport as passport } from "../config/passport-config.js";

export const authenticatedUser = passport.authenticate("jwt", {
  session: false,
});

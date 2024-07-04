const passport = require("../config/passport-config");

const authenticatedUser = passport.authenticate("jwt", { session: false });

module.exports = authenticatedUser;

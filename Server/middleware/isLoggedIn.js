const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new Error("User not authenticated");
};

module.exports = isLoggedIn;

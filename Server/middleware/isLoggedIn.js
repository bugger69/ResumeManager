const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  }
  throw new Error("User not authenticated");
};

module.exports = isLoggedIn;

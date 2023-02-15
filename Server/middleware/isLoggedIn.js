const isLoggedIn = (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) {
    return next();
  }
  throw new Error("User not authenticated");
};

module.exports = isLoggedIn;

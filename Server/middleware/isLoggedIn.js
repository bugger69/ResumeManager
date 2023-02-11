const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  }
  console.log("not authenticated");
  throw new Error("User not authenticated");
};

module.exports = isLoggedIn;

const adminAuth = (req, res, next) => {
  const token = "atY78rGHY36f5kY";
  const isAuthenticated = token === "atY78rGHY36f5kY";
  if (isAuthenticated) {
    console.log("user has been authenticated.");
    next();
  } else {
    res.status(401).send("User not authenticated");
  }
};

const userAuth = (req, res, next) => {
  const token = "jkdv88fahOknk";
  const isAuthenticated = token === "jkdv88fahO)hnknk";
  if (isAuthenticated) {
    console.log("user has been authenticated.");
    next();
  } else {
    res.status(401).send("User not authenticated");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

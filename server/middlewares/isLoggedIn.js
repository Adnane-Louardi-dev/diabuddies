exports.isLoggedIn = (req, res, next) => {
  // req.user ? next() : res.redirect("/login");
  req.user ? next() : res.sendStatus(401);
};

exports.isAdminLoggedIn = (req,res,next) => {
  req.user?.isAdmin ? next() : res.sendStatus(401)
}
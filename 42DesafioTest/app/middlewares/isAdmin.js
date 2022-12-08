const isAdmin = (req, res, next) => {
    if (req.user.isAdmin === true) {
      console.log('Bienvenido Admin');
      return next();
    } else {
      res.redirect("/");
    }
  };
  
  module.exports = isAdmin;
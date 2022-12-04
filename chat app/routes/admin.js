const express = require("express");
var ls = require("local-storage");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.send(
    '<form action="/users" method="POST"><input type="text" name="name" placeholder="Username"><button type="submit">Login</button></form>'
  );
});

router.post("/users", (req, res, next) => {
  let login = req.body.name;
  if (ls.get("name") == null) {
    res.redirect("/login");
  }
  ls.set("name", login);
  console.log(ls.get("name"));
  res.redirect("/message");
});

module.exports = router;

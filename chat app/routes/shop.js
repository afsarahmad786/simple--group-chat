const express = require("express");
var ls = require("local-storage");
const fs = require("fs");
const router = express.Router();

router.get("/message", (req, res, next) => {
  if (ls.get("name") == null) {
    res.redirect("/login");
  } else {
    const data = fs.readFileSync("message.txt", {
      encoding: "utf8",
      flag: "r",
    });

    console.log(data);
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(data);
    res.write(
      '<form action="/done" method="POST"><input type="text" name="message" placeholder="Message"><button type="submit">Send</button></form>'
    );
    res.write("</html>");

    res.end();
  }
});
router.post("/done", (req, res, next) => {
  let message = req.body.message;
  let data = ls.get("name") + " " + message + " ";
  console.log(data);
  fs.appendFile("message.txt", data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  // console.log(ls.get("name"), " ", message);

  // console.log(message);
  res.redirect("/message");
});
router.get("/", (req, res, next) => {
  const data = fs.readFileSync("message.txt", {
    encoding: "utf8",
    flag: "r",
  });
  res.send(data);
  res.redirect("/message");
});

module.exports = router;

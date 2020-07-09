const express = require('express')
const app = express()

app.use(express.static("./dist/web-task-list-angular"));

app.get("/*", function(req, res) {
  res.sendFile("index.html", {root: "dist/web-task-list-angular"});
});

app.listen(process.env.PORT || 8080);

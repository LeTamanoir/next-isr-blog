export default function handler(req, res) {
  const db = require("better-sqlite3")(
    require("path").resolve(__dirname, "database.sqlite")
  );
  if (req.method === "POST") {
    db.prepare("DELETE FROM `articles` WHERE `id` = @id").run(req.body);
  }
  res.send(200);
}

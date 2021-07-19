export default function handler(req, res) {
  const db = require("better-sqlite3")("database.sqlite");
  if (req.method === "POST") {
    db.prepare("DELETE FROM `articles` WHERE `id` = @id").run(req.body);
    db.exec("VACUUM");
  }
  res.send(200);
  db.close();
}

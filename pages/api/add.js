export default function handler(req, res) {
  const db = require("better-sqlite3")(
    require("path").resolve(__dirname, "database.sqlite")
  );
  if (req.method === "POST") {
    db.prepare(
      "INSERT INTO `articles` (`title`, `content`) VALUES (@title, @content)"
    ).run(req.body);
  }
  res.send(200);
}

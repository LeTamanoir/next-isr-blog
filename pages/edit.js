var markdown = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});
import { useState } from "react";
import Editor from "../components/Editor";
import Router from "next/router";

export default function Edit({ articleData }) {
  const [article, setArticle] = useState(articleData);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(article);
    const res = await fetch("/api/edit", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(article),
    });

    res.ok && Router.push("/");
  };

  return (
    <Editor
      article={article}
      setArticle={setArticle}
      markdown={markdown}
      onSubmit={onSubmit}
    />
  );
}

export async function getServerSideProps(ctx) {
  const db = require("better-sqlite3")("database.sqlite");
  const articleData = db
    .prepare("SELECT * FROM `articles` WHERE `id` = ?")
    .get(ctx.query.id);
  articleData.content = articleData.content
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");

  return {
    props: {
      articleData,
    },
  };
}

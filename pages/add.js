var markdown = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});
import { useState } from "react";
import Editor from "../components/Editor";
import Router from "next/router";

export default function Edit({}) {
  const [article, setArticle] = useState({ title: "", content: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(article);
    const res = await fetch("/api/add", {
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

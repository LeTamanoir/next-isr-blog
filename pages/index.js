import Head from "next/head";
import Articles from "../components/Articles";
import Link from "next/link";
import Router from "next/router";

export default function Home({ articles }) {
  const deleteArticle = async (id) => {
    const res = await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) Router.reload();
  };

  const editArticle = (id) => {
    Router.push({
      pathname: "/edit",
      query: { id: id },
    });
  };

  return (
    <>
      <Link href="/add">
        <a className="btn btn-primary">Add</a>
      </Link>
      <Articles
        articles={articles}
        onDelete={deleteArticle}
        onEdit={editArticle}
      />
    </>
  );
}

export async function getServerSideProps() {
  const db = require("better-sqlite3")("database.sqlite");
  const articles = db.prepare("SELECT `title`,`id` FROM `articles`").all();
  db.close();

  return {
    props: {
      articles,
    },
  };
}

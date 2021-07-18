var markdown = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});
import Link from "next/link";
import Head from "next/head";

export default function Article({ article }) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article className="container p-4 border rounded-3">
        <h3 className="text-break">{article.title}</h3>
        <hr />
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: markdown.render(article.content) }}
        ></div>
      </article>
      <Link href="/">
        <a className="btn btn-secondary my-4">Back</a>
      </Link>
    </>
  );
}

export async function getStaticProps({ params }) {
  const db = require("better-sqlite3")("database.sqlite");
  const article = db
    .prepare("SELECT * FROM `articles` WHERE `title` = ?")
    .get(params.title);

  article.content = article.content
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");

  return {
    props: {
      article,
    },
    // revalidate: 40,
  };
}
export async function getStaticPaths() {
  const db = require("better-sqlite3")("database.sqlite");
  const paths = db
    .prepare("SELECT `title` FROM `articles`")
    .all()
    .map((path) => ({ params: path }));

  return {
    paths,
    fallback: "blocking",
  };
}

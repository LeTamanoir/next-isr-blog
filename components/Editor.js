import Link from "next/link";

export default function Editor({ article, setArticle, markdown, onSubmit }) {
  return (
    <form className="container" onSubmit={onSubmit}>
      <input
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        className="form-control mb-4 w-auto mx-auto"
        type="text"
        defaultValue={article.title}
        placeholder="title"
      />
      <div className="row">
        <div className="col-6">
          <textarea
            onChange={(e) =>
              setArticle({ ...article, content: e.target.value })
            }
            className="form-control"
            style={{ height: "60vh" }}
            placeholder="content"
            defaultValue={article.content}
          ></textarea>
        </div>
        <div className="col-6">
          <div
            className="w-100 markdown-body overflow-scroll"
            style={{ height: "60vh" }}
            dangerouslySetInnerHTML={{
              __html: markdown.render(
                article.content.length > 0 ? article.content : ""
              ),
            }}
          ></div>
        </div>
      </div>
      <div className="mt-4 btn-group d-block text-center">
        <Link href="/">
          <a className="btn btn-secondary">Back</a>
        </Link>
        <input className="btn btn-primary" type="submit" defaultValue="edit" />
      </div>
    </form>
  );
}

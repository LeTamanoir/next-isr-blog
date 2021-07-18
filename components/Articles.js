import Link from "next/link";

export default function Articles({ articles, onDelete, onEdit }) {
  return (
    <div className="container mt-5">
      <div className="row g-4">
        {articles.map((article) => (
          <div key={article.id} className="col-12 col-lg-4">
            <div className="p-3 border rounded ">
              <h3 className="text-break">{article.title}</h3>
              <div className="d-flex justify-content-between align-items-center">
                <Link href={`/articles/${encodeURIComponent(article.title)}`}>
                  <a className="link-primary">Read More</a>
                </Link>
                <div className="btn-group">
                  <button
                    onClick={(e) => onEdit(article.id)}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(article.id)}
                    className="btn btn-danger btn-sm"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

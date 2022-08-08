import React from "react";

function NewsItem(props) {
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            right: "0",
            position: "absolute",
          }}
        >
          <span className="badge rounded-pill bg-danger">{props.source}</span>
        </div>
        <img src={props.imageUrl} className="card-img-top" alt="..." />

        <div className="card-body">
          <h5 className="card-title">{props.title}...</h5>
          <p className="card-text">{props.description}...</p>
          <a
            href={props.newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read more
          </a>
          <p className="card-text my-3">
            By : {!props.author ? "Unknown" : props.author} On :{" "}
            {new Date(props.date).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;

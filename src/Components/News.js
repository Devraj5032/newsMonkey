import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?&country=${
      props.country
    }&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${
      props.pageSize
    }&category=${props.category}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h2 className="text-center" style={{marginTop : "100px"}}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className=" row">
            {articles.map((news) => {
              return (
                <div className="col-md-4" key={Math.random()}>
                  <NewsItem
                    title={news.title ? news.title.slice(0, 30) : ""}
                    description={
                      news.description ? news.description.slice(0, 88) : ""
                    }
                    imageUrl={
                      news.urlToImage
                        ? news.urlToImage
                        : "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/hypatia-h-e9c2889d4dc9aa791c3aacf75f9a650c-h-480cb34ed34f2714f73fa6375adbb025-1658863096.jpeg?crop=1.00xw:0.846xh;0,0&resize=1200:*"
                    }
                    newsUrl={news.url}
                    author={news.author}
                    date={news.publishedAt}
                    source={news.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

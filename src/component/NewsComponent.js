import React, { Component } from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  articles = [
    {
      source: {
        id: "associated-press",
        name: "Associated Press",
      },
      author: "Joseph Wilson",
      title:
        "Spain: 1 dead in church machete attacks, terror link probed - The Associated Press - en Español",
      description:
        "BARCELONA, Spain (AP) — A machete-wielding man killed a sexton and injured a priest at two Catholic churches in the city of Algeciras on Wednesday before being arrested, Spain’s interior ministry said.",
      url: "https://apnews.com/article/crime-spain-9fedf5fe435c743b4ef918d01debcb64",
      urlToImage:
        "https://storage.googleapis.com/afs-prod/media/52e3f2f4143b4acdb18ccba733224387/1600.webp",
      publishedAt: "2023-01-26T04:52:30Z",
      content:
        "BARCELONA, Spain (AP) A machete-wielding man killed a sexton and injured a priest at two Catholic churches in the city of Algeciras on Wednesday before being arrested, Spains interior ministry said. … [+2247 chars]",
    },
  ];

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NexusNews - ${this.capitalize(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let dataParsed = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: dataParsed.articles,
      totalResults: dataParsed.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  next = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  previous = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; 
    let data = await fetch(url);
    let dataParsed = await data.json();
    this.setState({
      articles: this.state.articles.concat(dataParsed.articles),
      totalResults: dataParsed.totalResults,
      loading: false,
    });
    console.log(dataParsed);
  };

  render() {
    return (
      <div>
        <h1 className=" text-center" style={{marginTop: "80px"}}>
          Express News - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)? false : true}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((e) => {
                return (
                  <div className="col-md-4 my-3" key={e.url}>
                    <NewsItem
                      title={e.title}
                      desc={e.description}
                      imgUrl={e.urlToImage}
                      newsUrl={e.url}
                      author={e.author}
                      date={e.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default NewsComponent;

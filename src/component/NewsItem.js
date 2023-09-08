import React, { Component } from 'react'

export class newsItem extends Component {
  render() {
    let {title, desc , imgUrl, newsUrl, author , date} = this.props;
    return (
      <div>
        <div className="card" >
          <img   src={imgUrl?imgUrl:"https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008048454.jpg?quality=75&strip=all&w=1200"} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h6 className="card-title">{title}...</h6>
              <p className="card-text">{desc}...</p>
              <p className="card-text">By {author?author : "Unknown"} on {new Date(date).toGMTString()}</p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default newsItem

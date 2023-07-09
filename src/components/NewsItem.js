import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let {title, description,imageUrl,newsUrl} = this.props;
        return (
            <div className='m-3'>
                <div className="card" style={{width: "18rem"}}>
                    <img src={imageUrl? imageUrl :"https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0708%2Fr1195390_1296x729_16%2D9.jpg"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

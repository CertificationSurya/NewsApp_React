import React, { Component } from 'react'
import NewsItem from './NewsItem'

// 0582ab78767848e8ac4338e127c25450
// https://newsapi.org/v2/everything?q={topic}&apiKey=API_KEY

export default class News extends Component {
    // creating a constructor
    constructor(){

        super(); // calling the constructor of Component(parent class)
        this.state ={
            articles: this.articles,
            loading: false
        }
    }



    render() {
        return (
            <div className='container m-3'>
                <h2>Top Headlines from all Around the world</h2>

                <div className="row">
                    <div className="col-md-4">
                        <NewsItem />
                    </div>
                    <div className="col-md-4">
                        <NewsItem />
                    </div>
                    <div className="col-md-4">
                        <NewsItem />
                    </div>

                </div>
            </div>
        )
    }
}
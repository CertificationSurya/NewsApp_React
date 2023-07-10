import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {

    // creating a constructor
    constructor() {

        super(); // calling the constructor of Component(parent class)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        
    }

    // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    // componentDidMount function executes ASAP but only after render() gets executed
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0582ab78767848e8ac4338e127c25450&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true}); 

        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})

    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0582ab78767848e8ac4338e127c25450&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true}); 
        
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
        
    }

    handleNextClick = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=us&apikey=0582ab78767848e8ac4338e127c25450&pages=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true}); 
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }




    render() {
        return (
            <div className='container m-3'>
                <h2 className='text-center'>Top Headlines from all Around the world</h2>
                {this.state.loading && < Spinner />}
                <div className="row">

                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-evenly">
                    <button className='btn btn-dark' disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button className='btn btn-dark' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}onClick={this.handleNextClick} >Next &rarr;</button>
                </div>
            </div>
        )
    }
}
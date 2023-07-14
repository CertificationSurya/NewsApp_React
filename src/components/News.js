import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// 0582ab78767848e8ac4338e127c25450 - My APi

export default class News extends Component {
    // assigning default value for props
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: "general"
    }

    // data types for props
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    // capitalize Function
    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // creating a constructor
    constructor(props) {

        super(props); // calling the constructor of Component(parent class)
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} -News App`
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        this.props.setProgress(30)

        let parsedData = await data.json()
        this.props.setProgress(50)

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            page: 2,
        })
        this.props.setProgress(100)
    }


    // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    // componentDidMount function executes ASAP but only after render() gets executed
    async componentDidMount() {
        this.updateNews()
    }


    // unused
    // handlePreviousClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1,
    //     })

    //     this.updateNews()
    // }

    // handleNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     })
    //     this.updateNews();

    // }

    // data fetching
    fetchMoreData = async () => {

        this.setState({
            page: this.state.page +1
            })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page }&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };



    render() {
        return (
            <>
                <h2 className='text-center'>Top {this.capitalize(this.props.category)} Headlines from all Around the world. </h2>
                {this.state.loading && < Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">


                        <div className="row">
                            {this.state.articles.map((element) => {

                                // Here we are giving fetch data directly and then we are modifying and improving on "NewsItem.js" so that code won't look like shit.
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-evenly">
                        <button className='btn btn-dark' disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button className='btn btn-dark' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} >Next &rarr;</button>
                    </div> */}
            </>
        )
    }
}
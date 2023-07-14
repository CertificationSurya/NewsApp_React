import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// 0582ab78767848e8ac4338e127c25450 - My APi

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    
    // capitalize Function
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    
    
    const updateNews = async () => {

        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);

        let data = await fetch(url);
        props.setProgress(30)

        let parsedData = await data.json()
        props.setProgress(50)

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100)
    }
    
    useEffect(() => {
        // change title of HTML web
        document.title = `${capitalize(props.category)} -News App`
        updateNews()
    })


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        
        setPage(page +1)
        
        let data = await fetch(url);
        let parsedData = await data.json()

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


    return (
        <>
            <h2 className='text-center' style={{marginTop: '80px'}}>Top {capitalize(props.category)} Headlines from all Around the world. </h2>
            {loading && < Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">


                    <div className="row">
                        {articles.map((element) => {

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
                        <button className='btn btn-dark' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNextClick} >Next &rarr;</button>
                    </div> */}
        </>
    )
}


// assigning default value for props
News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general"
}

// data types for props
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News;
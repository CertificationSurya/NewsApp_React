import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    // modifying date format from string
    date = new Date(date) // converting to date object
    date = date.toGMTString() //Changing date to GMT Format


    return (
        <div className='m-3'>
            <div className="card" >
                <div style={{ position: 'absolute', right: 0 }}>
                    <span className=' badge rounded-pill bg-danger p-2' > {source ? source : "Unknown"}</span>
                </div>

                <img src={imageUrl ? imageUrl : "https://dummyimage.com/400x400/dee2e6/6c757d.jpg"} className="card-img-top" alt="..." />
                <div className="card-body"> 
                    <h5 className="card-title">{title ? title.slice(0, 45) : ""}...
                    </h5>

                    <p className="card-text">{description ? description.slice(0, 90) : ""}...</p>
                    <p className="card-text"><small className='text-primary'>By {author ? author : "Unknown"} on {date}</small></p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import spinner from './spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("Hello I am constructor")
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }
    }
    async componentDidMount() {
        console.log("cdm")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=029b34e3bc2d40e98b6ca81f71f3dbbf&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, laoding: false })
    }
    handlePrevClick = async () => {
        console.log("Previous");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=029b34e3bc2d40e98b6ca81f71f3dbbf&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        /*
       https://newsapi.org/v2/top-headlines?country=us&category=business&category=${this.props.category}&apiKey==029b34e3bc2d40e98b6ca81f71f3dbbf
        */
        this.setState({ loading: true });
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
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {



            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=029b34e3bc2d40e98b6ca81f71f3dbbf&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
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
            <div className="container my-3">
                <h1 className="text-center">Daily Bugle- Top Headlines</h1>
                {this.state.loading && <spinner />}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}


                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>


            </div>
        )
    }
}

export default News

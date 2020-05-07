import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import getJSONP from '../getData';

export default class MobileList extends React.Component{
    constructor(){
        super();
        this.state={
            movies:''
        };
    }

    componentWillMount(){
        getJSONP("https://api.douban.com/v2/movie/"+this.props.type
        +"?count="+this.props.count,(json)=>this.setState({movies:json}))
    }

    render(){

        const {movies} = this.state;
        const moviesList = movies.length
        ?
        movies.map((moviesItem,index)=>(
            <section key={index} className='m-article list-item special-section clearfix'>
                <Link to={`details/${moviesItem.uniquekey}`} target="_blank">
                    <div className='m-article-img'>
                        <img alt={moviesItem.title} src={moviesItem.thubnail_pic_s}/>
                    </div>
                    <div className='m-article-info'>
                        <div className='m-article-title'>
                            <span>{moviesItem.title}</span>
                        </div>
                        <div className='m-article-desc clearfix'>
                            <div className='m-article-desc-l'>
                                <span className='m-article-channel'>{moviesItem.realtype}</span>
                                <span className='m-article-channel'>{moviesItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        ))
        :
        '未加载到任何电影';

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {moviesList}
                    </Col>
                </Row>
            </div>
        );
    };
}
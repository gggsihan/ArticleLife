import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

export default class MobileList extends React.Component{
    constructor(){
        super();
        this.state={
            news:''
        };
    }

    componentWillMount(){
        var myFetchOptions = {
            method:'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type
        +"&count="+this.props.count,myFetchOptions)
        .then(response=>response.json())
        .then(json=>this.setState({news:json}))
    }

    render(){

        const {news} = this.state;
        const newsList = news.length
        ?
        news.map((newsItem,index)=>(
            <section key={index} className='m-article list-item special-section clearfix'>
                <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                    <div className='m-article-img'>
                        <img alt={newsItem.title} src={newsItem.thubnail_pic_s}/>
                    </div>
                    <div className='m-article-info'>
                        <div className='m-article-title'>
                            <span>{newsItem.title}</span>
                        </div>
                        <div className='m-article-desc clearfix'>
                            <div className='m-article-desc-l'>
                                <span className='m-article-channel'>{newsItem.realtype}</span>
                                <span className='m-article-channel'>{newsItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        ))
        :
        '未加载到任何新闻';

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        );
    };
}
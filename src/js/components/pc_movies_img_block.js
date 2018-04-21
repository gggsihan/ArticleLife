import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCMoviesImgBlock extends React.Component{
    constructor(){
        super();
        this.state={
            movies:''
        };
    }

    componentWillMount(){
        console.log('willmount')
        var myFetchOptions = {
            method:'GET',
            mode:'cors'
        };
        var that = this;
        fetch("https://api.douban.com/v2/movie/"+this.props.type+"?count="+this.props.count,myFetchOptions)
        .then(function(res){
            console.log('response:' +res);
            that.setState({movies:res.subjects})
        });
        
    }

    render(){
        console.log('render')
        const {movies} = this.state;
        console.log(movies);
        const styleImage={
            display:'block',
            width:this.props.imageWidth,
            height:"90px"
        };
        const styleH3={
            width:this.props.imageWidth,
            whiteSpace:"nowrap",
            overflow:"hidden",
            textOverflow:"ellipsis"
        }
        const moviesList = movies
        ?
        movies.map((moviesItem,index)=>(
            <div key={index} className='imageblock'>
                <Link to={`details/${moviesItem.uniquekey}`} target="_blank">
                    <div className='custom-image'>
                        <img alt='' style={styleImage} src={moviesItem.images}/>
                    </div>
                    <div className='custom-card'>
                        <h3 style={styleH3}>{moviesItem.title}</h3>
                        <p>{moviesItem.original_title}</p>
                    </div>
                </Link>
            </div>
        ))
        :
        '未加载到任何电影';

        return (
            <div className='moviesList'>
                <Card title={this.props.cardTitle} bordered={true} style={{width:this.props.width}}>
                    {moviesList}
                </Card>
            </div>
        );
    };
}
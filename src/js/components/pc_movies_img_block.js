import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import getJSONP from '../getData'

export default class PCMoviesImgBlock extends React.Component{
    constructor(){
        super();
        this.state={
            movies:'',
        };
    }
    componentWillMount(){
        let that = this;
        console.log('this', this);
        getJSONP(
            "https://douban.uieee.com/v2/movie/"+this.props.type+"?count="+this.props.count,
            (json)=>{
                that.setState({movies:json.subjects});
            }
        )
        
    }

    render(){
        console.log('render')
        const {movies} = this.state;
        console.log(movies);
        const styleImage={
            display:'block',
            width:this.props.imageWidth,
            height:"130px"
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
                        <img alt='' style={styleImage} src={moviesItem.images.small}/>
                    </div>
                    <div className='custom-card'>
                        <h3 style={styleH3}>{moviesItem.title}</h3>
                        <p style={styleH3}>{moviesItem.original_title}</p>
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
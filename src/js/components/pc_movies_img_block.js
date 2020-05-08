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
    componentDidMount(){
        let fetchOption = {
          method: 'GET'
        }
        fetch(`https://douban.uieee.com/v2/movie/${this.props.type}?count=${this.props.count}`, fetchOption)
          .then(res=> {
            res.json().then(data => {
              this.setState({movies: data.subjects})
            })
          })
    }

    render(){
        const {movies} = this.state;
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
        movies.map((moviesItem)=> {
          const item = moviesItem.subject ? moviesItem.subject : moviesItem
          return (
            <div key={item.id} className='imageblock'>
                <Link to={`details/${item.id}`} target="_blank">
                    <div className='custom-image'>
                        <img alt='' style={styleImage} src={item.images.small}/>
                    </div>
                    <div className='custom-card'>
                        <h3 style={styleH3}>{item.title}</h3>
                        <p style={styleH3}>{item.original_title}</p>
                    </div>
                </Link>
            </div>
          );
        })
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
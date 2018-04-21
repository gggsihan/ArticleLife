import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCMoviesBlock from './pc_movies_block'
import PCMoviesImgBlock from './pc_movies_img_block'

export default class PCMoviesContainer extends React.Component{
    render(){
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slideToShow:1,
            autoplay:true
        };
        
        return (
            <div style={this.props.showORNot}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='container'>
                        <div className='topContainer'>
                            <div className='carousel'>
                                <Carousel {...settings}>
                                    <div><img src='./src/images/carousel_1.png'/></div>
                                    <div><img src='./src/images/carousel_2.png'/></div>
                                    <div><img src='./src/images/carousel_3.png'/></div>
                                    <div><img src='./src/images/carousel_4.png'/></div>
                                </Carousel>
                            </div>
                            <div className='moviesContainer'>
                                <PCMoviesImgBlock count={6} type='in_theaters' width='100%' cardTitle='热映中' imageWidth='112px' />
                                {/* <PCMoviesImgBlock count={6} type='coming_soon' width='100%' cardTitle='即将上映' imageWidth='112px' />
                                <PCMoviesImgBlock count={6} type='top250' width='100%' cardTitle='TOP250' imageWidth='112px' /> */}
                                {/* <PCMoviesImgBlock count={6} type='weekly' width='100%' cardTitle='口碑榜' imageWidth='112px' /> */}
                                {/* <PCMoviesImgBlock count={6} type='us_box' width='100%' cardTitle='票房榜' imageWidth='112px' />
                                <PCMoviesImgBlock count={6} type='new_movies' width='100%' cardTitle='新片榜' imageWidth='112px' /> */}
                            </div>
                            
                        </div>
                        
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}
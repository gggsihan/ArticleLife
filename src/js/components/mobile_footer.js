import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';

export default class MobileFooter extends React.Component{
    render(){
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='footer'>
                        &copy;&nbsp;2018 Artistic&nbsp;Life. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    };
}
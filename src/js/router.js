import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import 'antd/dist/antd.css';

export default class Root extends React.Component{
    render(){
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <PCIndex/>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <MobileIndex/>
                </MediaQuery>
            </div>
        );
    };
}

//入口的定义
ReactDom.render(<Root/>,document.getElementById('mainContainer'));
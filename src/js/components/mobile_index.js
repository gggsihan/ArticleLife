import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component{
    render(){
        return (
            <div>
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane tab='正在热映' key='1'>
                        <MobileList count={20} type='in_theaters' />
                    </TabPane>
                    <TabPane tab='即将上映' key='2'>
                        <MobileList count={20} type='coming_soon' />
                    </TabPane>
                    <TabPane tab='TOP250' key='3'>
                        <MobileList count={20} type='top250' />
                    </TabPane>
                    <TabPane tab='口碑榜' key='4'>
                        <MobileList count={20} type='weekly' />
                    </TabPane>
                    <TabPane tab='北美票房榜' key='5'>
                        <MobileList count={20} type='us_box' />
                    </TabPane>
                    <TabPane tab='新片榜' key='6'>
                        <MobileList count={20} type='new_movies' />
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    };
}
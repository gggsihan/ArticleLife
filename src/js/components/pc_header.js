import React from 'react';
import { Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';
import { get } from 'http';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'

class PCHeader extends React.Component{
    constructor(){
        super();
        this.state={
            current:'shouye ',//哪个菜单默认显示
            modalVisible:false,//模态框是否显示
            action:'login',//登录or注册
            hasLogined:false,//是否已经登录
            userNickName:'',//用户名
            userId:0  //用户ID
        }
    };

    componentWillMount(){
        if(localStorage.userId!=''){
            this.setState({hasLogined:true});
            this.setState({userNickName:localStorage.userNickName,userId:localStorage.userId})
        }
    }

    setModalVisible(value){
        this.setState({
            modalVisible:value
        });
    };

    handleClick(e){
        //确认header点击高亮并判断是否弹出模态框
        if(e.key=='register'){
            this.setState({current:'register'});
            this.setModalVisible(true);
        }else{
            this.setState({current:e.key});
            this.setModalVisible(false);
        };
        this.props.changeKey(e);
    };


    handleSumbit(e){
        //页面开始向API提交数据
        e.preventDefault();
        var myFetchOptions = {
            method:'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
            +"&username="+formData.userName+"&password="+formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json()).then(json => {
                this.setState({
                    userNickName: json.NickUserName,
                    userId: json.UserId
                });
                localStorage.userNickName = json.NickUserName;
                localStorage.userId = json.UserId;
            });
        if(this.state.action=='login'){
            this.setState({hasLogined:true});
        }
        message.success('请求成功！');
        this.setModalVisible(false);
    };

    callback(key){
        if(key==1){
            this.setState({action:'login'})
        }else{
            this.setState({action:'register'})
        }
    }

    logout(){
        localStorage.userId='';
        localStorage.userNickName='';
        this.setState({hasLogined:false});
    }

    render(){
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key='logout' className='register'>
                <Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target='_blank'>
                    <Button type='dashed' htmlType='button'>个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出登录</Button>
            </Menu.Item>
            :
            <Menu.Item key='register' className='register'>
                <Icon type="user" />注册/登录
            </Menu.Item>;
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href='/' className='logo'>
                            <img src='./src/images/logo.png' alt='logo'/>
                            <span>Artistic&nbsp;Life</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key='shouye'>
                                <Icon type="video-camera" />首页
                            </Menu.Item>
                            <Menu.Item key='in_theaters'>
                                <Icon type="video-camera" />热映中
                            </Menu.Item>
                            <Menu.Item key='coming_soon'>
                                <Icon type="video-camera" />即将上映
                            </Menu.Item>
                            <Menu.Item key='top250'>
                                <Icon type="video-camera" />TOP250
                            </Menu.Item>
                            <Menu.Item key='weekly'>
                                <Icon type="video-camera" />口碑榜
                            </Menu.Item>
                            <Menu.Item key='us_box'>
                                <Icon type="video-camera" />票房榜
                            </Menu.Item>
                            <Menu.Item key='new_movies'>
                                <Icon type="video-camera" />新片榜
                            </Menu.Item>
                            
                            {userShow}
                        </Menu>

                        <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible}
                            onCancel={() => this.setModalVisible(false)} cancelText='取消'
                            onOk={() => this.setModalVisible(false)} okText='关闭'>
                            <Tabs type='card' onChange={this.callback.bind(this)}>
                                <TabPane tab='登录' key='1'>
                                    <Form horizontal onSubmit={this.handleSumbit.bind(this)}>
                                        <FormItem label='账号'>
                                            {getFieldDecorator('userName')(<Input placeholder='请输入您的账号'/>)}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator('password')(<Input type='password' placeholder='请输入您的密码'/>)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab='注册' key='2'>
                                    <Form horizontal onSubmit={this.handleSumbit.bind(this)}>
                                        <FormItem label='账号'>
                                            {getFieldDecorator('r_userName')(<Input placeholder='请输入您的账号'/>)}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator('r_password')(<Input type='password' placeholder='请输入您的密码'/>)}
                                        </FormItem>
                                        <FormItem label='确认密码'>
                                            {getFieldDecorator('r_confirmPassword')(<Input type='password' placeholder='请再次输入您的密码'/>)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>

                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader);
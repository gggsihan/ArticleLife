import React from 'react';
import { Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'

class MobileHeader extends React.Component{
    constructor(){
        super();
        this.state={
            current:'top',//哪个菜单默认显示
            modalVisible:false,//模态框是否显示
            action:'login',//登录or注册
            hasLogined:false,//是否已经登录
            userName:'',//用户名
            userId:0  //用户ID
        }
    };

    setModalVisible(value){
        this.setState({
            modalVisible:value
        });
    };

    handleClick(e){
        //确认header点击高亮并判断是否弹出模态框
        if(e.key='register'){
            this.setState({current:'register'});
            this.setModalVisible(true);
        }else{
            this.setState({current:e.key});
        }
    };

    handleSumbit(e){
        //页面开始向API提交数据
        e.preventDefault();
        var myFetchOptions = {
            method:'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json()).then(json => {
                this.setState({
                    userName: json.UserName,
                    userId: json.UserId
                });
            });
        message.success('请求成功！');
        this.setModalVisible(false);
    };

    login(){
        this.setModalVisible(true);
    };

    callback(key){
        if(key==1){
            this.setState({action:'login'})
        }else{
            this.setState({action:'register'})
        }
    }


    render(){
        let {getFieldDecorator} = this.props.form;
        const userShow=this.state.hasLogined
        ?
        <Link>
            <Icon type='inbox'/>
        </Link>
        :
        <Icon type='setting' onClick={this.login.bind(this)} />;

        return (
            <div id='mobileHeader'>
                <header>
                    <img src='./src/images/logo.png' alt='logo' />
                    <span>Artistic&nbsp;Life</span>
                    {userShow}
                </header>

                <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible}
                    onCancel={() => this.setModalVisible(false)} cancelText='取消'
                    onOk={() => this.setModalVisible(false)} okText='关闭'>
                    <Tabs type='card'>
                        <TabPane tab='登录' key='1'>
                            <Form horizontal onSubmit={this.handleSumbit.bind(this)}>
                                <FormItem label='账号'>
                                    {getFieldDecorator('userName')(<Input placeholder='请输入您的账号' />)}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password')(<Input type='password' placeholder='请输入您的密码' />)}
                                </FormItem>
                                <Button type='primary' htmlType='submit'>登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab='注册' key='2'>
                            <Form horizontal onSubmit={this.handleSumbit.bind(this)}>
                                <FormItem label='账号'>
                                    {getFieldDecorator('r_userName')(<Input placeholder='请输入您的账号' />)}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('r_password')(<Input type='password' placeholder='请输入您的密码' />)}
                                </FormItem>
                                <FormItem label='确认密码'>
                                    {getFieldDecorator('r_confirmPassword')(<Input type='password' placeholder='请再次输入您的密码' />)}
                                </FormItem>
                                <Button type='primary' htmlType='submit'>注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    };
}

export default MobileHeader = Form.create({})(MobileHeader);
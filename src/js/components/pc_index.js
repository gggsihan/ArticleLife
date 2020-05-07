import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCMoviesContainer from './pc_moviescontainer'

export default class PCIndex extends React.Component{
    constructor(){
        super();
        this.state={
            shouyeShow:'block',
            fenleiShow:'none'
        }
    }
    changeKey(e){
        console.log(e);
        if(e.key=='shouye' || e.key=='register'){
            this.setState({
                shouyeShow:'block',
                fenleiShow:'none'
            })
        }else{
            this.setState({
                shouyeShow:'none',
                fenleiShow:'block'
            })
        }
    }
    render(){
        const shouye = {
            display:this.state.shouyeShow
        };
        const fenlei = {
            display:this.state.fenleiShow
        }
        return (
            <div>
                <PCHeader changeKey={this.changeKey.bind(this)}></PCHeader>
                <PCMoviesContainer showORNot={shouye}></PCMoviesContainer>
                
                <PCFooter></PCFooter>
            </div>
        );
    };
}
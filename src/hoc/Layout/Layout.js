import React, { Component } from 'react';
import Aux from '../Auxl/Auxl';
import classes from './Layout.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state=
    {
        showSideDrawer:false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler=()=> {
        this.setState((prevState)=>
    {
                return{showSideDrawer : !prevState.showSideDrawer};
    });
}

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.content}>
                        {this.props.children}
                    </main>
                </div>
            </Aux>
        )
    }
}

export default Layout;
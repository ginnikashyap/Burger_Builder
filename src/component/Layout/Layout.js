import React, { Component } from 'react';
import Aux from '../../hoc/Auxl';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state=
    {
        showSideDrawer:true
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar/>
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
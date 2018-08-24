import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';


class App extends Component {
  // state={
  //   show:true
  // }
  
  // componentDidMount()
  // {
  //   setTimeout(()=>{
  //   this.setState({show:false});
  //         },5000);
  // }
  render() {
    return (
      <div>
       <Layout>
          <p>Test</p>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import Aux from '../Auxl/Auxl';
import Modal from '../../component/UI/Modal/Modal';

const withErrorHandler=(WrappedComponent,axios)=>
{
    return class extends Component
        {
            state={
            error:null
        };
        //Will use componentWillMount instead of didMount beacuse didmount is called after the last child element is rendered and here it is 
        //BurgerBuilder.So Any error in Burger builder component will not call interceptors and hence errors will not be encountered globally.
          componentWillMount()
            {   
                this.reqInterceptors=axios.interceptors.request.use(req=>{
                    this.setState({error: null});
                    return req;
                });

                this.resInterceptors=axios.interceptors.response.use(res=>res,error=>{
                    this.setState({error: error});
                    return 
                });
            }

            componentWillUnmount()
            {
                // console.log('Unmount');
                axios.interceptors.request.eject(this.reqInterceptors);
                axios.interceptors.response.eject(this.resInterceptors);
            }

            errorConfirmedHanlder=()=>{
                this.setState({error:null})
            }
            render()
            {
                return(
                    <Aux>
                        <Modal 
                            show={this.state.error}
                            modalClosed={this.errorConfirmedHanlder}>
                                {this.state.error ? this.state.error.message: null}
                        </Modal>
                        <WrappedComponent{...this.props}/>
                    </Aux>
                    )
            }
        }
    
}

export default withErrorHandler;
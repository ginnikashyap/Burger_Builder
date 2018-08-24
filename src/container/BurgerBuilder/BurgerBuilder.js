import React, { Component } from 'react';
import Aux from '../../hoc/Auxl/Auxl';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES={
    salad: 0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}

class BurgerBuilder extends Component {
    state={
        ingredients:null,
        totalPrice:4,
        purchaseble:false,
        purchasing:false,
        loading:false,
        error: false
    }

    componentDidMount()
    {
        axios.get('https://react-my-burger-2663f.firebaseio.com/ingredients.json')
        .then(response=> {
            this.setState({ingredients: response.data})
        }).catch(error=>{this.setState({error: true})})
    }

    updatePurcahseState=(ingredients)=>
    {   
        const sum=Object.keys(ingredients).map(igkey=>
            {
                return(ingredients[igkey]);
            }

        ).reduce((sum,el)=>{return (sum+el)},0)
        this.setState({purchaseble: sum>0})
    }


    
    addIngredientHandler=(type)=>
    {
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({ingredients: updatedIngredients,totalPrice:newPrice});    
        this.updatePurcahseState(updatedIngredients);
    }

    removeIngedientHandler=(type)=>
    {
        const oldCount=this.state.ingredients[type];
        if(oldCount<= 0){
            return;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({ingredients: updatedIngredients,totalPrice:newPrice});    
        this.updatePurcahseState(updatedIngredients);
    };

    purchaseHandler=()=>{
        this.setState({purchasing: true});
    }

    
     purchaseCancelHandler=()=>{
         this.setState({purchasing: false});
     }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "ginni",
                address: {
                    street: "1011,rue Hyman,DDO",
                    county: "CANADA"
                },
                email: "sadana_ginni@yahoo.com"
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', data).then(response => {
            this.setState({loading: false, purchasing: false})
            // console.log(response);
        }).catch(error => {this.setState({loading: false,  purchasing: false})})
        // // alert("You Continue!!");
    }



    render() {

        const disabledInfo={...this.state.ingredients};
         for (let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary=null;
        let burger=this.state.error ? <p>Something is Wrong!!Ingredienets can't be laoded</p> : <Spinner/>
       
        if(this.state.ingredients)
        {
            burger=(
            <Aux>
                <Burger ingredients={this.state.ingredients}>
                </Burger> 
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngedientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseble={this.state.purchaseble}
                    ordered={this.purchaseHandler}
                /> 
            </Aux>
            );
                orderSummary= <OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice}
                />; 
        }
            if(this.state.loading)
            {
                orderSummary=<Spinner/>;
            }   

        return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}    
            </Modal>
               {burger}
        </Aux>
        );

    }
}
export default withErrorHandler(BurgerBuilder,axios);
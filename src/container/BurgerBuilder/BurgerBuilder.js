import React, { Component } from 'react';
import Aux from '../../hoc/Auxl';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES={
    salad: 0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}

class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0   
        },
        totalPrice:4,
        purchaseble:false,
        purchasing:false
  

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

     purchaseContinueHandler=()=>{
        alert("You Continue!!");
    }



    render() {

        const disabledInfo={...this.state.ingredients};
         for (let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseContinued={this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}
                    price={this.state.totalPrice}/>
                </Modal>
            <Burger 
                ingredients={this.state.ingredients}>
               
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

    }
}
export default BurgerBuilder;
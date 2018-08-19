import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        return [...Array(props.ingredients[igkey])]
        .map((_, i) => {
            return <BurgerIngredients key={igkey + i} type={igkey} />
        });
    }).reduce((arr,el)=>{
         return arr.concat(el)
     },[]);
     
    //  console.log(transformedIngredients);

     if (transformedIngredients.length===0)
     {
        transformedIngredients=<p>Please start adding ingredients.</p>
     }

    

    //Above method converts an object of key value pair to an array of arrays (Array[1]=salad with  index 0)
    // array[2]= cheese with index 0 and cheese with index 1.
    //Reduce will reduce the above array of arrays to flatten the each array and access value of inner array
    // An Array of arrays.
    //  const ing=Object.keys(props.ingredients)
    // console.log(ing);
    // const ing3=(igkey)=>{
    //     return[...Array(props.ingredients[igkey])]
    // }
    // console.log(ing3);
    // const ing2=ing.map(ing3);
    // console.log(ing2);
    // console.log(...Array(2));
    // console.log(props.ingredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );

}
export default burger;
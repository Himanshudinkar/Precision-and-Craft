import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

    name:"mycart",

    initialState:{
        cart:[]
    },


    reducers:{
        addtocart:(state,actions) =>{
            const cartData = state.cart.filter(key=>key.id == actions.payload.id);
            if(cartData.length >= 1)
            {
                alert("product already added")
            }
            else
            {
                state.cart.push(actions.payload);
            }
        },



        quntyIncrease:(state,actions) =>{
            for(var i=0; i<state.cart.length; i++)
            {
                if(state.cart[i].id == actions.payload.id)
                {
                    state.cart[i].qnty++;
                }
            }
        },


         quntyDecrease:(state,actions) =>{
            for(var i=0; i<state.cart.length; i++)
            {
                if(state.cart[i].id == actions.payload.id)
                {
                    if(state.cart[i].qnty<=1)
                    {
                        alert("Quantity not less than 1")
                    }
                    else
                    {
                        state.cart[i].qnty--;
                    }
                }
            }
        },


         productRemove:(state, actions)=>{
            state.cart=state.cart.filter(key=>key.id!=actions.payload.id)
        },

        cartEmpty:(state)=>{
            state.cart=[];
        }
    }
})

export const {addtocart,quntyIncrease,quntyDecrease,productRemove,cartEmpty} = cartSlice.actions;
export default cartSlice.reducer
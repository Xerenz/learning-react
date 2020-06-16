import React, { Component } from 'react';

import Title from '../Title';
import CartColumn from './CartColumn';
import CartList from './CartList';
import EmptyCart from './EmptyCart';

import { ProducConsumer, ProductConsumer } from '../../context';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {cart} = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="your" title="cart"/>
                                    <CartColumn/>   
                                    <CartList value={value}/>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <EmptyCart/>
                            )
                        }
                    }}
                </ProductConsumer>
            </section>
        )
    }
}

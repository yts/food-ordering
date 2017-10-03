import React, { Component } from 'react';
import OrderSummary from './orderSummary';
import OrderItems from './orderItems';
import { getInputChange } from './utils/formUtils';

export const TipTypes = {
    PERCENTAGE: 'P',
    AMOUNT: 'A'
};

export const TipSplits = {
    EVENLY: 'E',
    PERCENTAGE: 'P'
}

export default class OrderDetails extends Component {
    state = {
        order: {
            notes: '',
            items: [
                {
                    id: 0,
                    name: 'ystitzer',
                    cost: 5.98,
                    paid: false
                },
                {
                    id: 1,
                    name: 'chars',
                    cost: 3.25,
                    paid: true
                }
            ],
            discount: 0,
            tax: 8.875,
            tip: 0,
            tipType: TipTypes.AMOUNT,
            tipSplit: TipSplits.EVENLY
        }
    };

    nextItemId = 0;
    createNewOrderItem() {
        return {
            id: this.nextItemId++,
            name: '',
            cost: 0,
            paid: false
        }
    }

    handleOrderChange = change => this.setOrderState(change);

    handleOrderInputChange = e => {
        this.setOrderState(getInputChange(e));
    }

    handleOrderItemInputChange = (id, e) => {
        const change = getInputChange(e);
        const newItems = this.state.order.items.map(item => {
            if (item.id !== id) return item;

            return { ...item, ...change };
        });

        this.setOrderState({ items: newItems });
    }

    removeOrderItem = removed => {
        const remainingItems = this.state.order.items.filter(item => item !== removed);

        this.setOrderState({items: remainingItems});
    }

    addOrderItem = e => {
        const newItem = this.createNewOrderItem();
        
        this.setOrderState(prevState => (
            {
                items: [...prevState.items, newItem]
            }
        ));
    }

    setOrderState(changed) {
        this.setState((prevState) => {
            if (typeof changed === 'function') {
                changed = changed(prevState.order);
            }
            
            return {
                order: {
                    ...prevState.order,
                    ...changed
                }
            }
        });
    }


    render() {
        return (
            <div className="container pt-4">
                <h1 className="mb-4">Lunch from J2</h1>
                <OrderSummary order={this.state.order}
                    onOrderInputChange={this.handleOrderInputChange}
                    onOrderChange={this.handleOrderChange}
                />
                <OrderItems order={this.state.order}
                    onOrderInputChange={this.handleOrderInputChange}
                    onOrderChange={this.handleOrderChange}
                    onOrderItemRemoved={this.removeOrderItem}
                    addNewOrderItem={this.addOrderItem}
                    onOrderItemInputChange={this.handleOrderItemInputChange} />
            </div>
        );
    }
}
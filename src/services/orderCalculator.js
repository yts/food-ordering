import {TipTypes, TipSplits} from '../orderDetails';

function getTax(cost, taxRate) {
    return getPercentage(cost, taxRate);
}

function getDiscount(cost, discount) {
    return - (getPercentage(cost, discount));
}

function getPercentage(amount, percentage) {
    return amount * (percentage / 100);
}

function getTip({order, item, total}) {
    const tip = order.tip;
   
    if (order.tipType === TipTypes.PERCENTAGE) {
        return getPercentage(total, tip)
    } else if (order.tipType === TipTypes.AMOUNT) {
        if (order.tipSplit === TipSplits.EVENLY){
            return tip / order.items.length;
        } else if (order.tipSplit === TipSplits.PERCENTAGE) {
            const orderCost = order.items.reduce((sum, item) => item.cost + sum, 0);
            const itemCostPercentage = item.cost / orderCost;
            return tip * itemCostPercentage;
        }
            
    }
}

export function getItemAmounts(order, item) {
    const cost = item.cost;
    let total = cost;
    const discount = getDiscount(total, order.discount);
    total += discount;
    const tax = getTax(total, order.tax);
    total += tax;
    const tip = getTip({order, item, total});
    total += tip;

    return {cost, discount, tax, tip, total};
}

export function getOrderAmounts(order) {
    return order.items.reduce((amounts, item) => {
        const currAmounts = getItemAmounts(order, item);

        for (let prop in amounts) {
            currAmounts[prop] = currAmounts[prop] + amounts[prop];
        }
        
        return currAmounts;
    }, {});
}
import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

export default function Price(props) {
    const price = formatter.format(props.amount);

    return (
        <span>{price}</span>
    );
}
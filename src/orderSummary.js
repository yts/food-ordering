import React from 'react';
import Price from './price';
import {getOrderAmounts} from './services/orderCalculator';

export default class OrderSummary extends React.Component {
    render() {
        const order = this.props.order;
        const {cost, discount, tax, tip, total} = getOrderAmounts(order);


        return (
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Order Summary</span>
                    <span className="badge badge-success">Paid</span>
                </div>
                <div className="card-body">
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <dl className="row text-right">
                                <dt className="col-6">Subtotal</dt>
                                <dd className="col-6"><Price amount={cost} /></dd>

                                <dt className="col-6">Discount</dt>
                                <dd className="col-6"><Price amount={discount} /></dd>

                                <dt className="col-6">Tax</dt>
                                <dd className="col-6"><Price amount={tax} /></dd>

                                <dt className="col-6">Tip</dt>
                                <dd className="col-6"><Price amount={tip} /></dd>

                                <dt className="col-6">Total</dt>
                                <dd className="col-6 font-weight-bold"><Price amount={total} /></dd>
                            </dl>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label className="form-label">Notes:</label>
                                <textarea className="form-control" 
                                    name="notes" 
                                    rows="3" value={order.notes} 
                                    onChange={this.props.onOrderInputChange} />
                            </div>
                            <button className="btn btn-primary float-right">Order Placed</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
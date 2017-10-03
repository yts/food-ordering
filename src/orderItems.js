import React from 'react';
import { TipTypes, TipSplits } from './orderDetails';
import Price from './price';
import { getItemAmounts } from './services/orderCalculator';
import { getInputChange } from './utils/formUtils';

export default class OrderItems extends React.Component {
    handleOrderInputChange = (e) => {
        this.props.onOrderChange(getInputChange(e));
    }

    render() {
        const props = this.props;
        const { order, onOrderItemRemoved, addNewOrderItem } = props;
        const { handleOrderInputChange } = this;

        return (
            <div className="card mb-5">
                <div className="card-body">
                    <div className="row justify-content-between">
                        <div className="col-sm-6">
                            <div className="form-group form-row">
                                <label htmlFor="" className="col-form-label col-5">Discount</label>
                                <div className="input-group col">
                                    <input type="number" className="form-control"
                                        name="discount"
                                        value={order.discount}
                                        onChange={handleOrderInputChange} />
                                    <span className="input-group-addon">%</span>
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <label htmlFor="" className="col-form-label col-5">Tax</label>
                                <div className="input-group col">
                                    <input type="number" name="tax" className="form-control" value={order.tax} onChange={handleOrderInputChange} />
                                    <span className="input-group-addon">%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-5">
                            <div className="form-group form-row">
                                <label htmlFor="" className="col-form-label col-5">Tip</label>
                                <div className="input-group col">
                                    <select className="input-group-addon custom-select"
                                        onChange={handleOrderInputChange}
                                        value={order.tipType}
                                        name="tipType" >
                                        <option value={TipTypes.PERCENTAGE}>%</option>
                                        <option value={TipTypes.AMOUNT}>$</option>
                                    </select>
                                    <input type="number" onChange={handleOrderInputChange} value={props.tip} name="tip" className="form-control" />
                                </div>
                            </div>
                            {order.tipType === TipTypes.AMOUNT && (
                                <div className="form-group form-row">
                                    <div className="col-form-label col-5 col-sm-4 col-md-5">Split Tip</div>
                                    <div className="col">
                                        {[{ value: TipSplits.PERCENTAGE, text: 'By %' }, { value: TipSplits.EVENLY, text: 'Equally' }].map(({ value, text }) => (
                                            <div key={value} className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio"
                                                        checked={order.tipSplit === value}
                                                        name="tipSplit" value={value}
                                                        className="form-check-input"
                                                        onChange={handleOrderInputChange} />
                                                    <span>{text}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Order Amount</th>
                            <th className="d-none d-md-table-cell">Discount</th>
                            <th className="d-none d-md-table-cell">Tax</th>
                            <th className="d-none d-md-table-cell">Tip</th>
                            <th className="d-none d-sm-table-cell">Total</th>
                            <th>Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, i) => {
                            const { id, name, paid } = item;
                            const { cost, discount, tax, tip, total } = getItemAmounts(order, item);

                            return (
                                <tr key={id}>
                                    <td className="align-middle">
                                        <input type="text" name="name" className="form-control"
                                            onChange={e => props.onOrderItemInputChange(id, e)}
                                            value={name} />
                                    </td>
                                    <td className="align-middle">
                                        <div className="input-group">
                                            <span className="input-group-addon d-none d-sm-flex">$</span>
                                            <input type="number" name="cost" className="form-control"
                                                value={cost}
                                                onChange={e => props.onOrderItemInputChange(id, e)} />
                                        </div>
                                    </td>
                                    <td className="align-middle d-none d-md-table-cell"><Price amount={discount} /></td>
                                    <td className="align-middle d-none d-md-table-cell"><Price amount={tax} /></td>
                                    <td className="align-middle d-none d-md-table-cell"><Price amount={tip} /></td>
                                    <td className="align-middle font-weight-bold d-none d-sm-table-cell"><Price amount={total} /></td>
                                    <td className="align-middle text-center">
                                        <input type="checkbox" onChange={e => props.onOrderItemInputChange(id, e)}
                                            checked={paid}
                                            name="paid" />
                                    </td>
                                    <td className="align-middle pl-3">
                                        <button className="close" onClick={e => onOrderItemRemoved(item)}>
                                            <span >&times;</span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-link" onClick={addNewOrderItem}>New Order Item</button>
            </div>
        );
    }
}
import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-info container-machine-products">
                <button className="btn btn-primary panel-button item-machine product-btn" onClick={this.props.toggleProductModal}>
                    <span className="glyphicon glyphicon-plus"></span>Добави продукт
                </button>

                {this.props.products.map((product) => {
                    return <Product key={product.name} product={product} toggleProductModal={this.props.toggleProductModal} />
                })}
            </div>
        );
    }
}

export default ProductList;

import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333',
    color: 'white'
  }
};

Modal.setAppElement('#root')

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProduct: {
        name: '',
        amount: '',
        price: '',
        cost: '',
        machineID: ''
      }
    }

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fff';
  }

  onSubmit(e) {
    e.preventDefault();
    var self = this

    self.state.newProduct.machineID = self.props.machineID;

    axios.post('/api/product', self.state.newProduct)
    .then((res) => {
      self.props.toggleProductModal();
    })
    .catch((err) => {
      console.log('Error creating product!');
    });
  }

  updateInput(e, field) {
    this.state.newProduct[field] = e.target.value;
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showProductModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.toggleProductModal}
          style={customStyles}
          contentLabel="Add Product"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Добави Продукт</h2>
          <form onSubmit={this.onSubmit}>
            Име на Продукт: <br />
            <input onChange={(e) => {this.updateInput(e, 'name')}} className="form-control" type="text" name="name" required /><br />
            Количество: <br />
            <input onChange={(e) => {this.updateInput(e, 'amount')}} className="form-control" type="text" name="amount" required /><br />
            Цена: <br />
            <input onChange={(e) => {this.updateInput(e, 'price')}} className="form-control" type="text" name="price" required /><br />
            Цена на зареждане: <br />
            <input onChange={(e) => {this.updateInput(e, 'cost')}} className="form-control" type="text" name="cost" required /><br />
            <button className="btn btn-primary panel-button product-btn" onClick={this.registerProduct}>
              <span className="glyphicon glyphicon-plus"></span>Добави Продукт
        </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ProductModal;

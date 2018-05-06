import React, { Component } from 'react';
import './App.css';

class Home extends Component {
	state = {
		products: []
	}
	
	componentDidMount() {
		this.getProducts();
	}
	
	getProducts = _ => {
	  fetch('http://localhost:4000/sql/query-1')
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({ products: response })
		})
		.catch(err => console.error(err))
	}
  
	renderProduct = ({ product_id, name, price }) => <div className="row" key={product_id}><span className="cell">{name}</span><span className="cell">{price}</span></div>
  
	render() {
	  const { products } = this.state;
	  return (
		<div id="table">
			<div className="row">
				<span className="cell">Identifiant</span>
				<span className="cell">Nom</span>
			</div>
			{products.map(this.renderProduct)}
        </div>
    );
  }
}
export default Home;
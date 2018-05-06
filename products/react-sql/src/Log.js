import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Log extends Component {
   state = {
		files: []
	}
	
	componentDidMount() {
		this.getFiles();
	}
	
	getFiles = _ => {
	  fetch('http://localhost:4000/logs/')
		.then(response => response.json())
		.then(response => {
			this.setState({ files: response })
		})
		.catch(err => console.error(err))
	}
  
	renderFile = ({ index, name, content }) => <div className="row"><span className="cell" key={index}>{name}</span><span className="cell">{content}</span></div>
  
	render() {
	  const { files } = this.state;
	  return (
		<div id="table">
			<div className="row">
				<span className="cell">Nom</span>
				<span className="cell">Contenu</span>
			</div>
			{files.map(this.renderFile)}
        </div>
    );
	}
}
export default Log;
import React from 'react';
import { createMarkup } from './Helpers'

const Homepage = (props) => {
	const body = () => {
		return ( <div dangerouslySetInnerHTML={createMarkup(props.data.body)}></div> )
	};
	return (
		<div style={{fontFamily: 'arial'}}>
			<h1>{ props.data.title }</h1>
			{ props.data.subheaders.map((subheader,i) => (<h2 key={i}>{subheader}</h2>)) }
			<div>
				{ body() }
				<p>{ props.data.author_signature }</p>
				<p>{ props.data.authors_note }</p>
			</div>
		</div>
	)
}

export default Homepage;
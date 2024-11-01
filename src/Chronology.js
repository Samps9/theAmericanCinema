import React from 'react';
import { createMarkup } from './Helpers'


const Chronology = (props) => {
	const filmsForYear = (htmlString) => {
		return ( <div dangerouslySetInnerHTML={createMarkup(htmlString)}></div> );
	}

	return(
			<div style={{fontFamily: 'arial'}}>
				<h1>{props.data.title}</h1>
				<div>
					{Object.keys(props.data).filter((k) => (!isNaN(k))).map((k) => (
						<div>
							<h2>{k}</h2>
							{filmsForYear(props.data[k])}
						</div>
					))}
				</div>
			</div>
		)
}

export default Chronology;
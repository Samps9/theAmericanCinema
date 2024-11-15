import React from 'react';
import { createMarkup } from './Helpers'


const Chronology = ({data, year}) => {
	const getYear = () => {
		return(year ? year : '1968');
	}
	const filmsForYear = (htmlString) => {
		return ( <div dangerouslySetInnerHTML={createMarkup(htmlString)}></div> );
	};

	return(
			<div style={{fontFamily: 'arial'}}>
				<h1>{data.title}</h1>
				<div>
					<div key={'chron_' + year} id={year}>
						<h2>{getYear()}</h2>
						{filmsForYear(data[getYear()])}
					</div>
				</div>
			</div>
		);
};

export default Chronology;
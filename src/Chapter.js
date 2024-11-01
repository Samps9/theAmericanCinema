import React from 'react';
import { slugifyDirector, createMarkup } from './Helpers'

const Chapter = (props) => {
	
	const films = (htmlString) => {
		return (
			<div dangerouslySetInnerHTML={createMarkup(htmlString)}></div>
		)
	}

	const about = (htmlString) => {
		return (
			<div dangerouslySetInnerHTML={createMarkup(htmlString)}></div>
		)
	}

	return (
		<div>
			<h1 style={{fontFamily: 'arial'}}>{props.data.chapter_roman_num}. {props.data.title}</h1>
			<em style={{fontFamily: 'georgia'}}>{props.data.blurb}</em>

			<div style={{fontFamily: 'arial'}}>
				{props.data.directors.map((d,di) => (
					<div key={di}>
						<h2 id={slugifyDirector(d.name)}>{d.name}</h2>
						{d.films ? films(d.films) : null}
						{d.about ? about(d.about.join('')) : null}
					</div>
				))}
			</div>

		</div>
	);
};

export default Chapter;
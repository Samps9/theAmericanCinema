import React from 'react';
import { slugifyDirector } from './Helpers'

function Chapter(props) {
	
	return (
		<div>
			<h1>{props.data.chapter_roman_num}. {props.data.title}</h1>
			<em>{props.data.blurb}</em>

			<div>
				{props.data.directors.map((d,di) => (
					<div key={di}>
						<h2 id={slugifyDirector(d.name)}>{d.name}</h2>
						<p><strong>FILMS:</strong> {d.films.join('  ')}</p>
						<div>
							{d.about.map((a,ai) => (
								<p key={ai}>{a}</p>
							))}
						</div>
					</div>
					
				))}
			</div>

		</div>
	);
}

export default Chapter;
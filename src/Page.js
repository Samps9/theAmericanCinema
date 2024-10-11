import React from 'react';
import Chapter from './Chapter';

function Page(props){

	const isHomePage = () => {
		const result = props.data.slug === 'the-american-cinema';
		return result;
	}

	const homePage = () => {
		return (
			<div>
				<h1>{props.data.title}</h1>
				{props.data.subheaders.map((sh,i) => (
					<h2 key={i}>{sh}</h2>
				))}
				<div>
					{props.data.body.map((b, i) => (
						<p key={i}>{b}</p>
					))}
					<p>{props.data.author_signature}</p>
					<p>{props.data.authors_note}</p>
				</div>
			</div>
		)
	}

	const isChapter = () => {
		const result = props.data.chapter_num !== undefined;
		return result;
	}

	const chapter = () => {
		return (
			<Chapter data={props.data}></Chapter>
		)
	}

	const isChronPage = () => {
		const result = props.data.slug === 'directorial-chronology-1968-2020';
		return result;
	}

	const chronPage = () => {
		return(
			<div>
				<h1>{props.data.title}</h1>
				<div>
					{Object.keys(props.data).filter((k) => (!isNaN(k))).map((k) => (
						<div>
							<h2>{k}</h2>
							{props.data[k].map((film) => (
								<p>{film}</p>
							))}
						</div>
					))}
				</div>
			</div>
		)
	}

	const error = () => {
		return (
			<div>
				<h1>This is not a valid page.</h1>
				<h1>Please use the navigation bar on the right to find a valid page.</h1>
			</div>
		)
	}

	return (
		<div> 
			{isHomePage() ? homePage() : isChapter() ? chapter() : isChronPage() ? chronPage() : error()}
		</div>
	);
}

export default Page;
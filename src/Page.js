import React from 'react';
import Chapter from './Chapter';
import Error from './Error';
import { createMarkup } from './Helpers'

function Page(props){

	const isHomePage = () => {
		const result = props.data.slug === 'the-american-cinema';
		return result;
	}

	const homePage = () => {
		const body = () => {
			return (
				<div dangerouslySetInnerHTML={createMarkup(props.data.body)}></div>
			)
			
		}
		return (
			<div style={{fontFamily: 'arial'}}>
				<h1>{props.data.title}</h1>
				{props.data.subheaders.map((sh,i) => (
					<h2 key={i}>{sh}</h2>
				))}
				<div>
					{body()}
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
		const filmsForYear = (htmlString) => {
			return (
				<div dangerouslySetInnerHTML={createMarkup(htmlString)}></div>
			)
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

	return (
		<div> 
			{isHomePage() ? homePage() : isChapter() ? chapter() : isChronPage() ? chronPage() : <Error></Error>}
		</div>
	);
}

export default Page;
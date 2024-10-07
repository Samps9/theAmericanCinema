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
import React from 'react';
import Chapter from './Chapter';

function Page(props){

	const isChapter = () => {
		const result = props.data.chapter_num !== undefined
		return result
	}

	const chapter = () => {
		return (
			<Chapter data={props.data}></Chapter>
		)
	}

	const bollocks = () => {
		return (
			<h1>bollocks</h1>
		)
	}

	return (
		<div> 
			{isChapter() ? chapter() : bollocks()}
		</div>
	);
}

export default Page;
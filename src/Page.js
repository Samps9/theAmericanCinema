import React from 'react';
import Homepage from './Homepage'
import Chapter from './Chapter';
import Chronology from './Chronology'
import Error from './Error';

function Page(props){

	const isHomePage = () => {
		const result = props.data.slug === 'the-american-cinema';
		return result;
	}

	const homePage = () => {
		return (<Homepage data={props.data}></Homepage>);
	}

	const isChapter = () => {
		const result = props.data.chapter_num !== undefined;
		return result;
	}

	const chapter = () => {
		return (<Chapter data={props.data}></Chapter>);
	}

	const isChronPage = () => {
		const result = props.data.slug === 'directorial-chronology-1968-2020';
		return result;
	}

	const chronPage = () => {
		return (<Chronology data={props.data}></Chronology>);	
	}

	return (
		<div> 
			{isHomePage() ? homePage() : isChapter() ? chapter() : isChronPage() ? chronPage() : <Error></Error>}
		</div>
	);
}

export default Page;
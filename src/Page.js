import React from 'react';
import Homepage from './Homepage'
import Chapter from './Chapter';
import Chronology from './Chronology';
import Error from './Error';

function Page({data, year}){

	const isHomePage = () => {
		const result = data.slug === 'the-american-cinema';
		return result;
	}

	const homePage = () => {
		return (<Homepage data={data}></Homepage>);
	}

	const isChapter = () => {
		const result = data.chapter_num !== undefined;
		return result;
	}

	const chapter = () => {
		return (<Chapter data={data}></Chapter>);
	}

	const isChronPage = () => {
		const result = data.slug === 'directorial-chronology-1968-2020';
		return result;
	}

	const chronPage = (year) => {
		return (<Chronology data={data} year={year}></Chronology>);	
	}	

	return (
		<div> 
			{isHomePage() ? homePage() : isChapter() ? chapter() : isChronPage() ? chronPage(year) : <Error></Error>}
		</div>
	);
}

export default Page;
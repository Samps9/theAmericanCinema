import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Page  from './Page';
import { slugifyDirector } from './Helpers'
import './App.css';



function App() {
	const location = useLocation();
	const [pages, setPages] = useState([]);
	const [slug, setSlug] = useState('')
	const directorRefs = useRef([]);

	useEffect(() => {
		fetch('/data').then(res => res.json()).then(data => {
			setPages(data);
			const currentSlug = location.pathname.split('/')[1]
			setSlug(currentSlug === '' ? 'the-american-cinema' : currentSlug)
		});

	}, [location]);

	const handleNavClick = (slug, directorIndex, e) => {
		// prevent page load:
		e.preventDefault();
		// still have the url update:
		window.history.replaceState(null, "New Page Title", slug);
		// setting slug effectively navigates by showing the relevant content:
		setSlug(slug);
		// TODO: handle scroll to director blurb
		if(directorIndex){
			// scroll to that element
			console.log(directorIndex);
		}
	}


	return (
		<div className="App">

			<div className="main-container" style={{padding: '10px'}}>
				<div>
					{pages.filter((p) => p['slug'] === slug).map((p,i) => (
						<Page key={i} data={p}></Page> 
					))}
						
				</div>
				<div style={{padding: '10px'}}>
					<nav style={{position: 'sticky', top: '0'}}>
						{pages.map((p, pi) => (
							<div key={pi}>
								<li className="list-style-none">
									<a href='#' onClick={(e) => handleNavClick(p.slug, null, e)}>{ p.chapter_roman_num ? p.chapter_roman_num + '. ' + p.title : p.title }</a>
								</li>
								{ p.chapter_num ? p.directors.map((d, di) => (<li><a href="#" onClick={(e) => handleNavClick(p.slug, di, e)}>{d.name.split('(')[0].trim()}</a></li>)) : null }
								<br/>
							</div>
						))}
					</nav>
				</div>
			</div>
			
		</div>
	);
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Page  from './Page';
import { slugifyDirector } from './Helpers'
import './App.css';



function App() {
	const location = useLocation();
	const [pages, setPages] = useState([]);
	const [slug, setSlug] = useState('')

	useEffect(() => {
		fetch('/data').then(res => res.json()).then(data => {
			setPages(data);
			const currentSlug = location.pathname.split('/')[1]
			// an empty slug should be the homepage:
			setSlug(currentSlug === '' ? 'the-american-cinema' : currentSlug)
		});

	}, [location]);

	const handleNavClick = (slug, e) => {
		// prevent page load:
		e.preventDefault();
		// still have the url update:
		window.history.replaceState(null, "New Page Title", slug);
		// setting slug effectively navigates by showing the relevant content:
		setSlug(slug);
		// make sure we return to the top of the page when we navigate:
		window.scrollTo(0, 0);
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
					<nav style={{position: 'sticky', top: '0', height: '100vh', overflow: 'scroll'}}>
						{pages.map((p, pi) => (
							<div key={'p_' + pi} style={{paddingBottom:'10px'}}>
								<li className="list-style-none">
									<a href='#' onClick={(e) => handleNavClick(p.slug, e)}>{ p.chapter_roman_num ? p.chapter_roman_num + '. ' + p.title : p.title }</a>
								</li>
								{ p.chapter_num && p.slug === slug ? p.directors.map((d, di) => (<li key={'d_' + di}><a href={'#' + slugifyDirector(d.name)}>{d.name.split('(')[0].trim()}</a></li>)) : null }
							</div>
						))}
					</nav>
				</div>
			</div>
			
		</div>
	);
}

export default App;

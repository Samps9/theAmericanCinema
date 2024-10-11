import React, { useState, useEffect } from 'react';
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
			// if there is a directorId, scroll to the relevant director blurb:
			const directorId = location.hash.split('#')[1]
			const directorEl = document.getElementById(directorId);
			if(directorEl){
				directorEl.scrollIntoView()
			}
		});
	}, [location]);

	const handleNavClick = (slug, directorId, e) => {
		// prevent page load so we only ever load data on request rather than on navigation:
		e.preventDefault();
		// still have the url update:
		window.history.replaceState(null, "New Page Title", slug);
		// setting slug effectively 'navigates' by showing the relevant content:
		setSlug(slug);
		const directorEl = document.getElementById(directorId);
		if(directorEl){
			// if there is a directorId, scroll to the corresponding director blurb
			directorEl.scrollIntoView({ behavior: 'smooth' })
		} else {
			// make sure we return to the top of the page when we 'navigate' to a new page:
			window.scrollTo(0, 0);
		}	
	}

	const directorLink = (d, di, chapterSlug) => {
		const directorId = slugifyDirector(d.name);
		const directorName = d.name.split('(')[0].trim();
		const slug = chapterSlug + '#' + directorId
		return(
			<li key={'d_' + di}>
				<a onClick={(e) => handleNavClick(slug, directorId, e)} href={'#' + directorName}>{directorName}</a>
			</li>
		)
	}


	return (
		<div className="App">

			<div className="main-container">
				<div style={{paddingLeft: '20px'}}>
					{pages.filter((p) => p['slug'] === slug.split('#')[0]).map((p,i) => (
						<Page key={i} data={p}></Page> 
					))}	
				</div>
				<div style={{paddingLeft: '20px'}}>
					<nav style={{position: 'sticky', top: '0', height: '100vh', overflow: 'scroll'}}>
						{pages.map((p, pi) => (
							<div key={'p_' + pi} style={{paddingBottom:'10px'}}>
								<li className="list-style-none">
									<a href='/' onClick={(e) => handleNavClick(p.slug, null, e)}>{ p.chapter_roman_num ? p.chapter_roman_num + '. ' + p.title : p.title }</a>
								</li>
								{ p.chapter_num && p.slug === slug ? p.directors.map((d, di) => (directorLink(d, di, p.slug))) : null }
							</div>
						))}
					</nav>
				</div>
			</div>
			
		</div>
	);
}

export default App;

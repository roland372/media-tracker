import React, { Fragment } from 'react';

//? <----- Router ----->
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//? <----- Pages ----->
import About from './pages/About';
import Charts from './pages/Charts';
import Home from './pages/Home';
import Media from './pages/Media';

//? <----- Styles ----->
import './App.css';

function App() {
	return (
		<Fragment>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/charts' element={<Charts />} />
					<Route path='/media' element={<Media />} />
				</Routes>
			</Router>
		</Fragment>
	);
}

export default App;

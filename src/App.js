import React from 'react';

//? <----- Router ----->
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//? <----- Pages ----->
import About from './pages/About';
import Charts from './pages/Charts';
import Home from './pages/Home';
import Media from './pages/Media';

//? <----- Styles ----->
import Layout from './components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<>
			<Router>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='media/*' element={<Media />} />
						<Route path='charts' element={<Charts />} />
						<Route path='about' element={<About />} />
					</Routes>
				</Layout>
			</Router>
		</>
	);
}

export default App;

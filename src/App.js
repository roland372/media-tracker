import React from 'react';

//? <----- Router ----->
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//? <----- User Auth ----->
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Profile from './components/Auth/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

//? <----- Components ----->
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//? <----- Pages ----->
import Anime from './components/Media/Anime/pages/Anime';
import About from './pages/About';
import Charts from './pages/Charts';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

//? <----- Styles ----->
import Layout from './components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SingleAnime from './components/Media/Anime/components/SingleAnime';

function App() {
	return (
		<>
			<Router>
				<Layout>
					<UserAuthContextProvider>
						<ToastContainer
							position='top-center'
							autoClose={2000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss={false}
							draggable
							pauseOnHover={false}
							transition={Flip}
							theme='dark'
							limit={3}
						/>
						<Routes>
							<Route
								path='/'
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/anime'
								element={
									<ProtectedRoute>
										<Anime />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/anime/:id'
								element={
									<ProtectedRoute>
										<SingleAnime />
									</ProtectedRoute>
								}
							/>
							<Route
								path='charts'
								element={
									<ProtectedRoute>
										<Charts />
									</ProtectedRoute>
								}
							/>
							<Route path='about' element={<About />} />
							<Route path='login' element={<Login />} />
							<Route path='signup' element={<Signup />} />
							<Route
								path='profile'
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</UserAuthContextProvider>
				</Layout>
			</Router>
		</>
	);
}

export default App;

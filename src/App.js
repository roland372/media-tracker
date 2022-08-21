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
import Games from './components/Media/Games/pages/Games';
import Manga from './components/Media/Manga/pages/Manga';
import News from './components/Media/News/pages/News';
import Characters from './components/Media/Characters/pages/Characters';
import NotFound from './pages/NotFound';
import SingleAnime from './components/Media/Anime/components/SingleAnime';
import SingleGame from './components/Media/Games/components/SingleGame';
import SingleManga from './components/Media/Manga/components/SingleManga';
import SingleCharacter from './components/Media/Characters/components/SingleCharacter';

//? <----- Styles ----->
import Layout from './components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScrollToTopRouter from './components/Layout/ScrollToTopRouter';
import NotesList from './features/notes/NotesList';
import AddNote from './features/notes/AddNote';
import EditNote from './features/notes/EditNote';

function App() {
	return (
		<>
			<Router>
				<ScrollToTopRouter />
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
								path='media/games'
								element={
									<ProtectedRoute>
										<Games />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/games/:id'
								element={
									<ProtectedRoute>
										<SingleGame />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/manga'
								element={
									<ProtectedRoute>
										<Manga />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/manga/:id'
								element={
									<ProtectedRoute>
										<SingleManga />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/characters'
								element={
									<ProtectedRoute>
										<Characters />
									</ProtectedRoute>
								}
							/>
							<Route
								path='media/characters/:id'
								element={
									<ProtectedRoute>
										<SingleCharacter />
									</ProtectedRoute>
								}
							/>
							<Route path='news' element={<News />} />
							<Route
								path='charts'
								element={
									<ProtectedRoute>
										<Charts />
									</ProtectedRoute>
								}
							/>
							<Route
								path='notes'
								element={
									<ProtectedRoute>
										<NotesList />
									</ProtectedRoute>
								}
							/>
							<Route
								path='notes/add-note'
								element={
									<ProtectedRoute>
										<AddNote />
									</ProtectedRoute>
								}
							/>
							<Route
								path='notes/edit-note/:id'
								element={
									<ProtectedRoute>
										<EditNote />
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

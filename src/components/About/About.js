import React from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../hooks/useDocumentTitle';

const About = () => {
	useDocumentTitle('About');
	return (
		<CardComponent title='About'>
			<section className='mx-3 pt-2 text-start'>
				<h5>
					Media-Tracker is a web app where you can keep track of your favourite
					media like anime, games, manga, books, etc.
					<br />
					<br />
					You will need to register or log in using existing account to have
					access to it's full features because all data is being stored in a
					cloud database.
					<br />
					<br />
					After signing in you can start adding your media straight away, just
					select the type of media that interests you and fill out the form
					(only title is required, you can fill the rest later).
				</h5>
			</section>
			<section className='text-start mx-3 pt-4'>
				<h5>Here's full list of features that you can find on a website:</h5>
				<ul className='list-group text-color'>
					<li className='list-group-item bg-primary-dark text-color'>
						Add and update your favourite media:{' '}
						<Link
							className='link-primary text-decoration-none'
							to='/media/anime'
						>
							Anime
						</Link>
						,{' '}
						<Link
							className='link-primary text-decoration-none'
							to='/media/books'
						>
							Books
						</Link>
						,{' '}
						<Link
							className='link-primary text-decoration-none'
							to='/media/games'
						>
							Games
						</Link>
						,{' '}
						<Link
							className='link-primary text-decoration-none'
							to='/media/manga'
						>
							Manga
						</Link>
						,{' '}
						<Link
							className='link-primary text-decoration-none'
							to='/media/movies'
						>
							Movies
						</Link>{' '}
						<br />
						Here you can also see your selected media stats, display them as a
						grid or a table, search, sort or filter them out by status.
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<Link className='link-primary text-decoration-none' to='/charts'>
							Charts
						</Link>{' '}
						where you can quickly see some interesting stats like how much time
						you spent reading your books, how many anime episodes have you
						watched, etc.
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<Link className='link-primary text-decoration-none' to='/profile'>
							Profile
						</Link>{' '}
						to customize your own profile where you can change your avatar,
						update name, bio, background color or even change theme of the whole
						app.
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<Link className='link-primary text-decoration-none' to='/'>
							Links
						</Link>{' '}
						for some useful sites where you can find more information about the
						media that interests you.
					</li>
				</ul>
			</section>
			<section className='mx-2 text-start'>
				<hr />
				<h5 className='pb-2'>
					Languages and technologies used in this project:
				</h5>
				<ul className='list-group text-color'>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>ReactJS</b> as main frontend framework
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>React Router</b> for routing
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>Context API</b> to access user's auth throught the whole app
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>Firestore Firebase</b> as database
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>Axios</b> for fetching data
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>ChartJS</b> for charts
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>React Select</b> to have easier way of handling select inputs
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>React-Toastify</b> for pop-up notifications
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>React-Spinners</b> for loading spinners
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>Bootstrap v5.0</b> and <b>React-Bootstrap</b> for styling
					</li>
					<li className='list-group-item bg-primary-dark text-color'>
						<b>CSS</b> for some custom styles
					</li>
				</ul>
			</section>
		</CardComponent>
	);
};

export default About;

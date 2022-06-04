import React from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';

const SingleAnime = () => {
	return (
		<CardComponent title='JoJo no Kimyou na Bouken Part 7: Steel Ball Run'>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/anime'>
						Back to Media
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<section className='mx-2 mt-2'>
				<section className='d-lg-flex align-items-start'>
					<img
						className='img img-fluid'
						width='200px'
						src='https://cdn.myanimelist.net/images/manga/3/179882l.jpg'
						alt='Jojo'
					/>
					<div>
						<h5 className='mt-lg-0 mt-3'>Synopsis</h5>
						<p className='px-3 text-start'>
							In the American Old West, the world's greatest race is about to
							begin. Thousands line up in San Diego to travel over six thousand
							kilometers for a chance to win the grand prize of fifty million
							dollars. With the era of the horse reaching its end, contestants
							are allowed to use any kind of vehicle they wish. Competitors will
							have to endure grueling conditions, traveling up to a hundred
							kilometers a day through uncharted wastelands. The Steel Ball Run
							is truly a one-of-a-kind event. The youthful Johnny Joestar, a
							crippled former horse racer, has come to San Diego to watch the
							start of the race. There he encounters Gyro Zeppeli, a racer with
							two steel balls at his waist instead of a gun. Johnny witnesses
							Gyro using one of his steel balls to unleash a fantastical power,
							compelling a man to fire his gun at himself during a duel. In the
							midst of the action, Johnny happens to touch the steel ball and
							feels a power surging through his legs, allowing him to stand up
							for the first time in two years. Vowing to find the secret of the
							steel balls, Johnny decides to compete in the race, and so begins
							his bizarre adventure across America on the Steel Ball Run.
						</p>
						<section className='d-flex justify-content-around'>
							<div>
								<h5>Type</h5>
								<p>TV-Series</p>
							</div>
							<div>
								<h5>Link</h5>
								<a
									href='https://myanimelist.net/anime/1889/Higurashi_no_Naku_Koro_ni_Kai'
									target='_blank'
									rel='noreferrer'
								>
									<p>Link</p>
								</a>
							</div>
							<div>
								<h5>Episodes</h5>
								<p>23/24</p>
							</div>
							<div>
								<h5>Status</h5>
								<p>Plan to Watch</p>
							</div>
							<div>
								<h5>Rating</h5>
								<p>⭐10</p>
							</div>
						</section>
					</div>
				</section>
			</section>
		</CardComponent>
	);
};

export default SingleAnime;

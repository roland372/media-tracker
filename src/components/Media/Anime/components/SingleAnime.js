import React from 'react';

const SingleAnime = () => {
	return (
		<section className='border'>
			<h3>Jojo</h3>
			<h5>Synopsis</h5>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia iusto
				quisquam harum pariatur a, molestiae error corrupti laborum
				necessitatibus porro!
			</p>
			<h5>
				Type <span>TV-Series</span>
			</h5>
			<a
				href='https://reactrouter.com/docs/en/v6/getting-started/overview'
				target='_blank'
				rel='noreferrer'
			>
				Link
			</a>
			<div>
				<img
					className='img img-fluid'
					width='200px'
					src='https://cdn.myanimelist.net/images/manga/3/179882l.jpg'
					alt='Jojo'
				/>
			</div>
			<select className='form-select'>
				<option value='' disabled>
					Rating
				</option>
				<option value='1'>⭐1</option>
				<option value='2'>⭐2</option>
				<option value='3'>⭐3</option>
			</select>
			<div>Status</div>
		</section>
	);
};

export default SingleAnime;

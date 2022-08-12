import React from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Pagination from './Pagination';

const Wrapper = ({
	title,
	media,
	setCurrentPage,
	topMedia,
	mediaPerPage,
	type,
}) => {
	return (
		<CardComponent title={title}>
			<div className='row px-2'>
				{media?.map((media, index) => (
					<OverlayTrigger
						key={index}
						placement='auto'
						overlay={
							<Tooltip>
								{type === 'Top Anime' && (
									<div className='text-start'>
										<div>{media?.title}</div>
										<br />
										<div>Rank: {media?.rank}</div>
										<div>Aired: {media?.aired?.string}</div>
										<div>Episodes: {media?.episodes}</div>
										<div>Favorites: {media?.favorites}</div>
										<div>Popularity: {media?.popularity}</div>
										<div>Score: {media?.score}</div>
										<div>Scored by: {media?.scored_by}</div>
										<div>Season: {media?.season}</div>
										<div>Year: {media?.year}</div>
									</div>
								)}
								{type === 'Top Manga' && (
									<div className='text-start'>
										<div>{media?.title}</div>
										<br />
										<div>Chapters: {media?.chapters}</div>
										<div>Volumes: {media?.volumes}</div>
										<div>Favorites: {media?.favorites}</div>
										<div>Popularity: {media?.popularity}</div>
										<div>Rank: {media?.rank}</div>
										<div>Score: {media?.score}</div>
										<div>Scored by: {media?.scored_by}</div>
									</div>
								)}
							</Tooltip>
						}
					>
						<div className='col-xl-2 col-md-2 col-sm-4 col-4 mb-2'>
							<a href={media?.url} target='_blank' rel='noreferrer'>
								<img
									src={media?.images?.jpg?.image_url}
									alt=''
									className='w-100 shadow-1-strong rounded mb-2'
									style={{
										width: '20vw',
										height: '90%',
										objectFit: 'cover',
									}}
								/>
							</a>
						</div>
					</OverlayTrigger>
				))}
			</div>
			<Pagination
				setCurrentPage={setCurrentPage}
				topMedia={topMedia}
				mediaPerPage={mediaPerPage}
			/>
		</CardComponent>
	);
};

export default Wrapper;

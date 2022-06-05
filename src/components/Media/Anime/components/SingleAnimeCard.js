import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
// import { AiFillStar } from 'react-icons/ai';

const SingleAnimeCard = ({ title, imageURL, id, deleteAnime }) => {
	return (
		<section className='p-2 bg-image hover-zoom'>
			<OverlayTrigger
				trigger='click'
				placement='auto'
				rootClose
				// delay={{ show: 100, hide: 2000 }}
				overlay={
					<Popover>
						<Popover.Header>{title}</Popover.Header>
						<Popover.Body>
							<div className='d-flex justify-content-between'>
								<Link
									to={`/media/anime/${id}`}
									className='btn btn-sm btn-primary'
								>
									View
								</Link>
								<button className='btn btn-sm btn-success'>Edit</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => deleteAnime(id)}
								>
									Delete
								</button>
								<button
									className='btn btn-sm btn-warning'
									onClick={() => console.log('Added to favourites')}
								>
									<AiOutlineStar size={15} />
								</button>
							</div>
						</Popover.Body>
					</Popover>
				}
			>
				<img
					style={{ height: '200px', width: '150px' }}
					src={imageURL}
					alt={title}
					className='img img-fluid'
					role='button'
				/>
			</OverlayTrigger>
		</section>
	);
};

export default SingleAnimeCard;

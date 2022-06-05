import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
// import { AiFillStar } from 'react-icons/ai';

const SingleAnimeCard = props => {
	return (
		<section className='p-2 bg-image hover-zoom'>
			<OverlayTrigger
				trigger='click'
				placement='auto'
				rootClose
				// delay={{ show: 100, hide: 2000 }}
				overlay={
					<Popover>
						<Popover.Header>{props.title}</Popover.Header>
						<Popover.Body>
							<div className='d-flex justify-content-between'>
								<Link to='/media/anime/1' className='btn btn-sm btn-primary'>
									View
								</Link>
								<button className='btn btn-sm btn-success'>Edit</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => console.log('Deleted')}
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
					style={{ maxHeight: '200px', maxWidth: '150px' }}
					src={props.imageURL}
					alt={props.title}
					className='img img-fluid'
					role='button'
				/>
			</OverlayTrigger>
		</section>
	);
};

export default SingleAnimeCard;

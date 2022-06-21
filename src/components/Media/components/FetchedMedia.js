import React from 'react';
import CardComponent from '../../Layout/CardComponent';

const FetchedMedia = ({ cardTitle, children }) => {
	return (
		<CardComponent title={cardTitle}>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{children}
			</section>
		</CardComponent>
	);
};

export default FetchedMedia;

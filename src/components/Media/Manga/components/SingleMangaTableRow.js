import React from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

const SingleMangaTableRow = ({
	index,
	image,
	title,
	rating,
	type,
	chaptersMin,
	chaptersMax,
	volumesMin,
	volumesMax,
	lastModified,
	id,
}) => {
	return (
		<tr className='text-color'>
			<td className='px-2'>{index}</td>
			<td>
				<img
					src={
						image
							? image
							: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
					}
					width='80px'
					alt='placeholder'
				/>
			</td>
			<td>
				<Link className='link-color' to={`${id}`}>
					{title}
				</Link>
			</td>
			<td>{rating === 0 ? '-' : rating}</td>
			<td>{type}</td>
			<td>
				{chaptersMin} / {chaptersMax}
			</td>
			<td>
				{volumesMin} / {volumesMax}
			</td>
			<td>
				{new Date(lastModified).toLocaleDateString('en-GB', {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</td>
		</tr>
	);
};

export default SingleMangaTableRow;

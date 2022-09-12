import React from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

const SingleCharacterTableRow = ({
	gender,
	hairColor,
	id,
	image,
	index,
	lastModified,
	name,
	series,
	source,
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
					{name}
				</Link>
			</td>
			<td>{source}</td>
			<td>{gender}</td>
			<td>{series}</td>
			<td>{hairColor}</td>
			<td>
				{new Date(lastModified).toLocaleDateString('en-GB', {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</td>
		</tr>
	);
};

export default SingleCharacterTableRow;

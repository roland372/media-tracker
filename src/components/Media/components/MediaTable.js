import React from 'react';

//? <----- Icons ----->
import { FaSort } from 'react-icons/fa';

const MediaTable = ({
	children,
	menuItems,
	order,
	setMenuItems,
	setOrder,
	sortNumber,
	sortString,
}) => {
	return (
		<div className='table-responsive mx-2 rounded'>
			<table
				id='table-striped'
				className='table table-sm bg-secondary-medium text-color table-striped align-middle table-borderless'
				style={{ minWidth: '700px' }}
			>
				<thead className='bg-primary-dark text-center'>
					<tr>
						<th className='px-2' scope='col'>
							#
						</th>
						<th scope='col'>Image</th>
						<th scope='col'>
							Anime Title
							<FaSort
								onClick={() =>
									sortString('title', order, menuItems, setMenuItems, setOrder)
								}
							/>
						</th>
						<th scope='col'>
							Score
							<FaSort
								onClick={() =>
									sortNumber('rating', order, menuItems, setMenuItems, setOrder)
								}
							/>
						</th>
						<th scope='col'>
							Type
							<FaSort
								onClick={() =>
									sortString('type', order, menuItems, setMenuItems, setOrder)
								}
							/>
						</th>
						<th scope='col'>
							Progress
							<FaSort
								onClick={() =>
									sortNumber(
										'episodesMin',
										order,
										menuItems,
										setMenuItems,
										setOrder
									)
								}
							/>
						</th>
						<th scope='col'>
							Last Modified
							<FaSort
								onClick={() =>
									sortNumber(
										'lastModified',
										order,
										menuItems,
										setMenuItems,
										setOrder
									)
								}
							/>
						</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
};

export default MediaTable;

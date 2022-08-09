import React from 'react';

//? <----- Icons ----->
import { FaSort } from 'react-icons/fa';

const CharactersTable = ({
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
						<th className='px-2' scope='col' style={{ minWidth: '70px' }}>
							#
						</th>
						<th scope='col'>Image</th>
						<th scope='col' style={{ width: '200px' }}>
							Character Name
							<FaSort
								onClick={() =>
									sortString('title', order, menuItems, setMenuItems, setOrder)
								}
							/>
						</th>

						<th scope='col' style={{ minWidth: '80px' }}>
							Source
							<FaSort
								onClick={() =>
									sortString('source', order, menuItems, setMenuItems, setOrder)
								}
							/>
						</th>
						<th scope='col' style={{ minWidth: '110px' }}>
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

export default CharactersTable;

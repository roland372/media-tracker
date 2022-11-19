import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleCharacterCard from './SingleCharacterCard';
import SingleCharacterTableRow from './SingleCharacterTableRow';
import DisplayMoreButton from '../../components/DisplayMoreButton';

//? <----- Functions ----->
import { sortNumber, sortString } from '../../utils/sortFunctions';
import DisplayFilterSearchPanel from '../../components/DisplayFilterSearchPanel';
import CharactersTable from './CharactersTable';

const AllCharacters = ({
	allCharacters,
	deleteCharacter,
	getCharactersDatabase,
	user,
}) => {
	//* sort characters by name
	const sortedCharacters = allCharacters?.sort(function (a, b) {
		const nameA = a.name.toLowerCase(),
			nameB = b.name.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	//* display as list or grid state
	const [charactersDisplay, setCharactersDisplay] = useState(true);

	//* menu items state
	const [menuItems, setMenuItems] = useState(sortedCharacters);

	//* menu items state
	const [displayMore, setDisplayMore] = useState(false);

	useEffect(() => {
		setMenuItems(sortedCharacters);
	}, [sortedCharacters]);

	const charactersSource = ['All Characters', 'Anime', 'Game', 'Manga'];

	//* type filtering state
	const [source, setSource] = useState(charactersSource);

	//* search state
	const [searchTerm, setSearchTerm] = useState('');

	//* sorting state
	const [order, setOrder] = useState('DSC');

	const filterType = characterSource => {
		if (characterSource === 'All Characters') {
			setMenuItems(sortedCharacters);
			setSource(source);
			return;
		}
		const newData = sortedCharacters?.filter(
			type => type.source === characterSource
		);
		// console.log(newData);
		setMenuItems(newData);
	};

	if (sortedCharacters?.length < 1)
		return (
			<CardComponent title='All Characters'>
				<h4 className='text-center'>No Characters</h4>
			</CardComponent>
		);

	return (
		<CardComponent title='All Characters'>
			<DisplayFilterSearchPanel
				filterType={filterType}
				mediaDisplay={charactersDisplay}
				setMediaDisplay={setCharactersDisplay}
				setSearchTerm={setSearchTerm}
				searchPlaceholder='Character or Series'
				status={source}
			/>
			{charactersDisplay ? (
				//* display as grid
				<>
					<section className='d-flex align-items-center justify-content-start flex-wrap'>
						{menuItems
							//? display first 20 elements
							?.filter(value => {
								if (searchTerm === '') {
									return value;
								} else if (
									value.name
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase()) ||
									value.series
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase())
								) {
									return value;
								}
								return 0;
							})
							?.slice(0, 20)
							?.map(character => (
								<SingleCharacterCard
									deleteCharacter={deleteCharacter}
									getCharactersDatabase={getCharactersDatabase}
									key={character.id}
									singleCharacterDatabase={character}
									user={user}
								/>
							))}

						{displayMore
							? //? display the rest
							  menuItems
									?.filter(value => {
										if (searchTerm === '') {
											return value;
										} else if (
											value.name
												.toLowerCase()
												.includes(searchTerm.toLocaleLowerCase()) ||
											value.series
												.toLowerCase()
												.includes(searchTerm.toLocaleLowerCase())
										) {
											return value;
										}
										return 0;
									})
									?.slice(20)
									?.map(character => (
										<SingleCharacterCard
											deleteCharacter={deleteCharacter}
											getCharactersDatabase={getCharactersDatabase}
											key={character.id}
											singleCharacterDatabase={character}
											user={user}
										/>
									))
							: null}
					</section>
					<DisplayMoreButton
						displayMore={displayMore}
						menuItems={menuItems}
						setDisplayMore={setDisplayMore}
					/>
				</>
			) : (
				//* display as table
				<>
					<CharactersTable
						menuItems={menuItems}
						order={order}
						setMenuItems={setMenuItems}
						setOrder={setOrder}
						sortNumber={sortNumber}
						sortString={sortString}
					>
						{menuItems
							//? display first 20 elements
							?.filter(value => {
								if (searchTerm === '') {
									return value;
								} else if (
									value.name
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase()) ||
									value.series
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase())
								) {
									return value;
								}
								return 0;
							})
							?.slice(0, 20)
							?.map((character, index) => (
								<SingleCharacterTableRow
									gender={character.gender}
									hairColor={character.hairColor}
									id={character.id}
									image={character.imageURL}
									index={index + 1}
									key={character.id}
									lastModified={character.lastModified}
									name={character.name}
									series={character.series}
									source={character.source}
								/>
							))}

						{displayMore
							? //? display the rest
							  menuItems
									?.filter(value => {
										if (searchTerm === '') {
											return value;
										} else if (
											value.name
												.toLowerCase()
												.includes(searchTerm.toLocaleLowerCase()) ||
											value.series
												.toLowerCase()
												.includes(searchTerm.toLocaleLowerCase())
										) {
											return value;
										}
										return 0;
									})
									?.slice(20)
									?.map((character, index) => (
										<SingleCharacterTableRow
											gender={character.gender}
											hairColor={character.hairColor}
											id={character.id}
											image={character.imageURL}
											index={21 + index}
											key={character.id}
											lastModified={character.lastModified}
											name={character.name}
											series={character.series}
											source={character.source}
										/>
									))
							: null}
					</CharactersTable>
					<DisplayMoreButton
						displayMore={displayMore}
						menuItems={menuItems}
						setDisplayMore={setDisplayMore}
					/>
				</>
			)}
		</CardComponent>
	);
};

export default AllCharacters;

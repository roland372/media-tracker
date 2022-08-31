const EmoteImage = ({ id, emotesDatabase }) => {
	const filteredEmote = emotesDatabase?.[0]?.emotes?.filter(
		emote => emote?.id === id
	);
	return (
		<div className='mt-2'>
			<img src={filteredEmote?.[0]?.url} alt='' width='56px' />
		</div>
	);
};

export default EmoteImage;

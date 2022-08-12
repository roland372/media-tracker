import React from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import { usefulLinks } from '../../../Layout/Links';

const Links = () => {
	return (
		<CardComponent title='Links'>
			<section>
				{usefulLinks.map((link, index) => {
					const { url, text, icon } = link;
					return (
						<div key={index}>
							<a
								href={url}
								target='_blank'
								rel='noreferrer'
								className='link-color'
							>
								<span className='px-1'>{icon}</span>
								{text}
							</a>
						</div>
					);
				})}
			</section>
		</CardComponent>
	);
};

export default Links;

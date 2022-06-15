import React from 'react';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../hooks/useDocumentTitle';

const About = () => {
	useDocumentTitle('About');
	return <div>About</div>;
};

export default About;

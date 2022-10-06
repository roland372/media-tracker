import { FC, useEffect } from 'react';

//? <----- Router ----->
import { useLocation } from 'react-router-dom';

const ScrollToTopRouter: FC = (): null => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default ScrollToTopRouter;

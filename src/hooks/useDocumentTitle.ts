import { useRef, useEffect } from 'react';

function useDocumentTitle(title: string, prevailOnUnmount: boolean = false) {
	const defaultTitle = useRef(document.title);

	useEffect(() => {
		document.title = title + ' | Media-Tracker';
	}, [title]);

	useEffect(
		() => () => {
			if (!prevailOnUnmount) {
				document.title = defaultTitle.current;
			}
		},
		[prevailOnUnmount]
	);
}

export default useDocumentTitle;

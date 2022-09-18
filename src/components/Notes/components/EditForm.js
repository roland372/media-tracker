import React, { useRef, useEffect } from 'react';

//? <----- Styles ----->
import '../styles/Styles.css';

//? <----- Components ----->
import SubmitButton from './SubmitButton';
import { Editor } from '@tinymce/tinymce-react';

const EditForm = props => {
	const { setNewNote, newNote, handleEditNote } = props;

	// console.log(newNote?.note);

	const editorRef = useRef(newNote?.note);

	useEffect(() => {}, []);
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	return (
		<section className='form-group mx-2 mb-2'>
			<input
				className='form-control mb-3'
				onChange={e => setNewNote({ ...newNote, title: e.target.value })}
				placeholder='Enter Title'
				type='text'
				value={newNote.title}
			/>
			{/* <textarea
				className='form-control'
				onChange={e => setNewNote({ ...newNote, note: e.target.value })}
				placeholder='Enter Note'
				name='note'
				rows='4'
				value={newNote.note}
			/> */}

			<>
				<Editor
					apiKey={process.env.REACT_APP_TinyMCEAPIKey}
					cloudChannel='5-dev'
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue={newNote?.note}
					// onChange={e => setNote({ ...note, note: e.target.value })}
					onBlur={() =>
						setNewNote({ ...newNote, note: editorRef.current.getContent() })
					}
					// onChange={() => console.log(editorRef.current.getContent())}
					init={{
						height: 500,
						menubar: false,
						// plugins: [
						// 	// 'advlist autolink lists link image charmap print preview anchor',
						// 	// 'searchreplace visualblocks code fullscreen',
						// 	// 'insertdatetime media table paste code help wordcount',
						// 	// 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker',
						// 	'advlist',
						// 	'lists',
						// 	'autolink',
						// 	'preview',
						// 	'advcode',
						// ],
						// toolbar:
						// 	'undo redo | formatselect | ' +
						// 	'bold italic backcolor | alignleft aligncenter ' +
						// 	'alignright alignjustify | bullist numlist outdent indent | ' +
						// 	'removeformat | help',
						// // 'a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
						plugins: ['lists link image paste help wordcount code'],
						toolbar:
							'undo redo code | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
						content_style:
							'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						toolbar_mode: 'floating',
						tinycomments_mode: 'embedded',
						tinycomments_author: 'Author name',
						autoresize_bottom_margin: 50,
					}}
				/>
				{/* <button onClick={log}>Log editor content</button> */}
			</>

			<SubmitButton
				color='warning'
				text='Update Note'
				onClick={handleEditNote}
			/>
		</section>
	);
};

export default EditForm;

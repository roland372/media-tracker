import React, { useRef } from 'react';

//? <----- Components ----->
import SubmitButton from './SubmitButton';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { colorOptions } from '../utils/selectOptions';

const EditForm = ({ setNewNote, newNote, handleEditNote, filteredNote }) => {
	// const editorRef = useRef(newNote?.note);
	const editorRef = useRef(filteredNote?.[0]?.note);

	// useEffect(() => {}, []);
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	const customStyles = {
		control: base => ({
			...base,
			height: 40,
			minHeight: 40,
		}),
	};

	window.addEventListener('beforeunload', event => {
		event.returnValue = `Are you sure you want to leave?`;
	});

	if (newNote?.title === undefined) {
		newNote.title = filteredNote?.[0]?.title;
	}
	if (newNote?.color === undefined) {
		newNote.color = filteredNote?.[0]?.color;
	}
	if (newNote?.note === undefined) {
		newNote.note = filteredNote?.[0]?.note;
	}

	return (
		<section className='form-group mx-2 mb-2'>
			<div className='d-flex'>
				<input
					style={{ height: 40, minHeight: 40 }}
					className='form-control mb-3'
					onChange={e => setNewNote({ ...newNote, title: e?.target?.value })}
					placeholder='Enter Title'
					type='text'
					// value={newNote?.title}
					defaultValue={filteredNote?.[0]?.title}
				/>
				<div className='ms-2' style={{ zIndex: 100, width: '250px' }}>
					<Select
						styles={customStyles}
						// defautValue={{ label: newNote.color, value: newNote.color }}
						placeholder={filteredNote?.[0]?.color}
						options={colorOptions}
						className='text-dark'
						onChange={e => setNewNote({ ...newNote, color: e?.value })}
						isSearchable={false}
					/>
				</div>
			</div>
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
					initialValue={filteredNote?.[0]?.note}
					// onEditorChange={() => {
					// 	console.log('changed');
					// 	// updateNoteTimeout(editorRef.current.getContent());
					// }}
					onBlur={() => {
						setNewNote({ ...newNote, note: editorRef.current.getContent() });
						// console.log('blur');
						// console.log(newNote);
					}}
					// onFocus={() => {
					// 	setNewNote({ ...newNote, note: editorRef.current.getContent() });
					// 	console.log('focus');
					// 	console.log(newNote);
					// }}
					init={{
						autoresize_bottom_margin: 50,
						autosave_ask_before_unload: true,
						browser_spellcheck: true,
						content_style:
							'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						contextmenu: false,
						forced_root_block: '',
						// force_br_newlines: true,
						// force_p_newlines: false,
						height: 500,
						menubar: true,

						// plugins: autoresize
						plugins: [
							'advlist anchor autolink autosave charmap code codesample fullscreen help insertdatetime link lists image media nonbreaking pagebreak paste preview searchreplace save table template wordcount visualchars',
						],
						templates: [
							{
								title: 'Date modified example',
								description:
									'Adds a timestamp indicating the last time the document modified.',
								content:
									'<p>Last Modified: <time class="mdate">This will be replaced with the date modified.</time></p>',
							},
						],
						// toolbar: formatselect fontselect fontsizeselect
						toolbar:
							'undo redo | bold italic underline strikethrough | bullist numlist outdent indent | forecolor backcolor removeformat | link image media | alignleft aligncenter alignright alignjustify | superscript subscript codesample charmap | fullscreen code help restoredraft',

						toolbar_mode: 'floating',
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

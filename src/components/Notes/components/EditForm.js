import React, { useRef, useEffect } from 'react';

//? <----- Components ----->
import SubmitButton from './SubmitButton';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { colorOptions } from '../utils/selectOptions';

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

	const customStyles = {
		control: base => ({
			...base,
			height: 40,
			minHeight: 40,
		}),
	};

	// if (editorRef?.current?.isNotDirty) {
	// 	// alert('Not Saved!');
	// 	// console.log('not saved');
	// }

	// console.log(editorRef.current);

	// window.onbeforeunload = function (e) {
	// 	if (1) {
	// 		alert('test');
	// 		return;
	// 	}
	// 	var dialogText = 'asfasfasdfs';
	// 	e.returnValue = dialogText;
	// 	return dialogText;
	// };

	window.addEventListener('beforeunload', event => {
		event.returnValue = `Are you sure you want to leave?`;
	});

	return (
		<section className='form-group mx-2 mb-2'>
			<div className='d-flex'>
				<input
					style={{ height: 40, minHeight: 40 }}
					className='form-control mb-3'
					onChange={e => setNewNote({ ...newNote, title: e.target.value })}
					placeholder='Enter Title'
					type='text'
					value={newNote.title}
				/>
				<div className='ms-2' style={{ zIndex: 100, width: '250px' }}>
					<Select
						styles={customStyles}
						defautValue={{ label: newNote.color, value: newNote.color }}
						placeholder={newNote.color}
						options={colorOptions}
						className='text-dark'
						onChange={e => setNewNote({ ...newNote, color: e.value })}
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
					initialValue={newNote?.note}
					// onChange={e => setNote({ ...note, note: e.target.value })}
					onBlur={() =>
						setNewNote({ ...newNote, note: editorRef.current.getContent() })
					}
					// onChange={() => console.log(editorRef.current.getContent())}
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
							'advlist anchor autolink autosave charmap checklist code codesample fullscreen help insertdatetime link lists image media nonbreaking pagebreak paste preview searchreplace save table template wordcount visualchars',
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
							'undo redo | bold italic underline strikethrough | bullist numlist checklist outdent indent | forecolor backcolor removeformat | link image media | alignleft aligncenter alignright alignjustify | superscript subscript codesample charmap | fullscreen code help restoredraft',

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

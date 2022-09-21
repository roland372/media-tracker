import React, { useRef } from 'react';

//? <----- Components ----->
import SubmitButton from './SubmitButton';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { colorOptions } from '../utils/selectOptions';

const Form = props => {
	const { setNote, note, handleAddNote } = props;

	const editorRef = useRef(null);
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	// console.log(note);

	const customStyles = {
		control: base => ({
			...base,
			height: 40,
			minHeight: 40,
		}),
	};

	return (
		<section className='form-group mx-2 mb-2'>
			<div className='d-flex'>
				<input
					style={{ height: 40, minHeight: 40 }}
					className='form-control mb-3'
					onChange={e => setNote({ ...note, title: e.target.value })}
					placeholder='Enter Title'
					type='text'
				/>
				<div className='ms-2' style={{ zIndex: 100, width: '250px' }}>
					<Select
						styles={customStyles}
						defautValue={{ label: 'color', value: 'primary' }}
						placeholder='Select Color'
						options={colorOptions}
						className='text-dark'
						onChange={e => setNote({ ...note, color: e.value })}
						isSearchable={false}
					/>
				</div>
			</div>
			{/* <textarea
				className='form-control'
				onChange={e => setNote({ ...note, note: e.target.value })}
				placeholder='Enter Note'
				// value={note.note}
				type='text'
				rows='4'
			/> */}

			<>
				<Editor
					apiKey={process.env.REACT_APP_TinyMCEAPIKey}
					cloudChannel='5-dev'
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue='<p>This is the initial content of the editor.</p>'
					// onChange={e => setNote({ ...note, note: e.target.value })}
					onChange={() =>
						setNote({ ...note, note: editorRef.current.getContent() })
					}
					// onChange={() => console.log(editorRef.current.getContent())}
					init={{
						autoresize_bottom_margin: 50,
						browser_spellcheck: true,
						content_style:
							'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						forced_root_block: '',
						// force_br_newlines: true,
						// force_p_newlines: true,
						height: 500,
						menubar: true,

						// plugins: autoresize
						plugins: [
							'advlist anchor autolink autosave charmap checklist code codesample fullscreen help insertdatetime lists link image media nonbreaking pagebreak paste preview searchreplace save table template wordcount visualchars',
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
							'undo redo | bold italic underline strikethrough | bullist numlist checklist outdent indent | forecolor backcolor removeformat | link image media | alignleft aligncenter alignright alignjustify | superscript subscript codesample charmap | fullscreen code help',

						toolbar_mode: 'floating',
					}}
				/>
				{/* <button onClick={log}>Log editor content</button> */}
			</>

			<SubmitButton color='success' text='Add Note' onClick={handleAddNote} />
		</section>
	);
};

export default Form;

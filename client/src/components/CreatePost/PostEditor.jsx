import React, { useRef } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
	toolbar: {
		items: [
			'heading','|',
			'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', '|',
			'blockQuote', 'strikethrough', 'subscript', 'superscript', '|',
			'outdent', 'indent', '|',
			'undo', 'redo', '|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
			'highlight', 'insertTable', 'horizontalLine'
		],
		shouldNotGroupWhenFull: true
	},
};

const PostEditor = ({postData, setPostData}) => {

	const editorRef = useRef(null);

	const handleEditorChange = ( event, editor ) => {
		setPostData(prev => ({...prev, 'message': editor.getData()}));
	} 

    return (
		<CKEditor
			editor={ Editor }
			config={editorConfiguration}
			data={postData.message}
			onReady={ editor => {editorRef.current = editor;}}
			onChange={handleEditorChange }
		/>
    )
}


export default PostEditor;
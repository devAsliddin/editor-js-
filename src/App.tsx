import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

function App() {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
      },
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        const content: OutputData = await editor.save();
        console.log('Content: ', content);
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="edit">
        <div id="editorjs"></div>
      </div>
    </div>
  );
}

export default App;

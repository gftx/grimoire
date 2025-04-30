import { FC, MouseEvent } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from './styles.module.scss';

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const TiptapEditor: FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: 'end',
    editable: true,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editor,
        spellcheck: 'true',
        autocapitalize: 'off',
        autocomplete: 'off',
        autocorrect: 'off',
      },
    },
  });

  if (!editor) return null;

  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <div className={styles.wrapper} onClick={stop} onMouseDown={stop}>
      <div className={styles.toolbar}>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleBold().run(); }}>B</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleItalic().run(); }}>I</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleBulletList().run(); }}>• List</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleCode().run(); }}>{'<>'}</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleBlockquote().run(); }}>Quote</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }}>H1</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}>H2</button>
        <button onClick={(e) => { e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }}>H3</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

import { FC, MouseEvent, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from './styles.module.scss';

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
  editable?: boolean;
}

export const TiptapEditor: FC<TiptapEditorProps> = ({ content, onChange, editable = true }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: 'end',
    editable,
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
        'aria-label': 'Journal editor',
      },
    },
  });

  // Sync editor content with prop changes (e.g., when loading from backend)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '<p></p>', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, editor]);

  if (!editor) return null;

  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <div className={styles.wrapper} onClick={stop} onMouseDown={stop}>
      <div className={styles.toolbar}>
        <button type="button" aria-label="Bold" title="Bold (Ctrl+B)" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleBold().run(); }} className={editor.isActive('bold') ? styles.active : ''}><b>B</b></button>
        <button type="button" aria-label="Italic" title="Italic (Ctrl+I)" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleItalic().run(); }} className={editor.isActive('italic') ? styles.active : ''}><i>I</i></button>
        <button type="button" aria-label="Bullet List" title="Bullet List" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleBulletList().run(); }} className={editor.isActive('bulletList') ? styles.active : ''}>• List</button>
        <button type="button" aria-label="Code" title="Code" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleCode().run(); }} className={editor.isActive('code') ? styles.active : ''}>{'<>'}</button>
        <button type="button" aria-label="Blockquote" title="Blockquote" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleBlockquote().run(); }} className={editor.isActive('blockquote') ? styles.active : ''}>❝</button>
        <button type="button" aria-label="Heading 1" title="Heading 1" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}>H1</button>
        <button type="button" aria-label="Heading 2" title="Heading 2" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}>H2</button>
        <button type="button" aria-label="Heading 3" title="Heading 3" onClick={e => { e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }} className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}>H3</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

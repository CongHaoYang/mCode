import React, {useRef, useEffect} from "react";
import EditorHeader from "./EditorHeader";
import MonacoEditor from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import styles from "./index.module.css";
import { useCodeStore } from "@/store";

const Editor: React.FC<EditorProps> = (props) => {
    const { type, defaultLanguage, defaultValue } = props;
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const setHTMLCode = useCodeStore(state => state.setHTMLCode);
    const setJsCode = useCodeStore(state => state.setJsCode);
    const setCssCode = useCodeStore(state => state.setCssCode);

    // 编辑器挂载后获取代码初始值
    const handleEditorDidMount = (
        editor: monacoEditor.editor.IStandaloneCodeEditor,
        monaco: typeof monacoEditor
    ) => {
        editorRef.current = editor;
        switch(type) {
            case "css":
                setCssCode(editorRef.current.getValue());
                break;
            case "html":
                setHTMLCode(editorRef.current.getValue());
                break;
            case "javascript":
                setJsCode(editorRef.current.getValue());
                break;
            default:
                break;
        }
    }

    const handleEditorChange = (
        value: string | undefined,
        event: monacoEditor.editor.IModelContentChangedEvent
    ) => {
        if (!value) return;
        switch(type) {
            case "css":
                setCssCode(value);
                break;
            case "html":
                setHTMLCode(value);
                break;
            case "javascript":
                setJsCode(value);
                break;
            default:
                break;
        }
    }

    
    return (
        <div className={`relative flex flex-1 flex-col h-full ${styles.divide}`}>
            <EditorHeader type={type}></EditorHeader>
            <div className="w-full flex-1">
                <MonacoEditor
                    height="100%"
                    defaultLanguage={defaultLanguage}
                    theme="vs-dark"
                    defaultValue={defaultValue}
                    onMount={handleEditorDidMount}
                    onChange={handleEditorChange}
                />
            </div> 
        </div>
    )
}
export default Editor;
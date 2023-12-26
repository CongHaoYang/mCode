import { useRef, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import SettingDialog from "@/components/SettingDialog";
import { Resizable } from 're-resizable';
import { useCodeStore } from "@/store";
import defaultConfig from "@/components/SettingDialog/SettingMenuItem/defaultValue";

export default function Main() {
    const setHeadStoreConfig = useCodeStore(state => state.setHeadConfig);
    const setBodyStoreConfig = useCodeStore(state => state.setBodyConfig);
    const setHtmlStoreConfig = useCodeStore(state => state.setHtmlConfig);
    const setCssBaseConfig = useCodeStore(state => state.setCssBaseConfig);
    const setCssResourceConfig = useCodeStore(state => state.setCssResourceConfig);
    const setJsResourceConfig = useCodeStore(state => state.setJsResourceConfig);
    const editor: EditorProps[] = [
        {
            type: 'html',
            defaultLanguage: 'html',
            defaultValue: "<div>milo</div>"
        },
        {
            type: 'css',
            defaultLanguage: 'css',
            defaultValue: `body {
    background-color: black;
    color: white;
}`
        },
        {
            type: 'javascript',
            defaultLanguage: 'javascript',
            defaultValue: "console.log('hello milo!');"
        }
    ];
    const handleClasses = {
        bottom: 'milo-bottom-handle',
    };

    useEffect(() => {
        setHeadStoreConfig(defaultConfig.Markup.head);
        setBodyStoreConfig(defaultConfig.Markup.body);
        setHtmlStoreConfig(defaultConfig.Markup.html);
        setCssBaseConfig(defaultConfig.Style.base);
        setCssResourceConfig(defaultConfig.Style.resource);
        setJsResourceConfig(defaultConfig.Script.resource);
    }, [])

    return (
        <div className="relative h-full w-[calc(100vw-3rem)]">   
            <div className="absolute h-full w-full flex flex-col">
                <Resizable 
                    defaultSize={{ width: "100%", height: 400 }} 
                    minHeight="200" 
                    maxHeight="800"
                    enable={{ "bottom": true }}
                    handleClasses={handleClasses}
                >
                    <div 
                        className="absolute flex flex-row h-[25rem] w-full"
                    >
                        { 
                            editor.map((editorItem, editorKey) => 
                            <Editor 
                                key={editorKey}
                                type={editorItem.type}
                                defaultLanguage={editorItem.defaultLanguage}
                                defaultValue={editorItem.defaultValue}
                            ></Editor>
                            )
                        }
                    </div>
                </Resizable>
                {/* <div className={`w-full ${styles.divide}`}></div> */}
                <div className="flex-1 w-full">
                    <Preview></Preview>
                </div>
            </div> 
            <SettingDialog></SettingDialog> 
        </div>
    )
}
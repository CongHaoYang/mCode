import { useEffect, useRef, useState } from "react";
import { IconPlayCircle } from "@arco-design/web-react/icon";
import { useRunCodeStore, useCodeStore } from "@/store";

export default function Preview() {
    const iframeDiv = useRef<HTMLIFrameElement>(null);
    const isRun = useRunCodeStore(state => state.isRun);
    let [isShowMask, setShowMask] = useState<boolean>(true); // 是否展示蒙层
    const runCode = useRunCodeStore(state => state.toRun);
    const getHTMLCode = useCodeStore(state => state.getHTMLCode);
    const getCssCode = useCodeStore(state => state.getCssCode);
    const getJsCode = useCodeStore(state => state.getJsCode);
    const cssBaseConfig = useCodeStore(state => state.cssBaseConfig);
    const headConfig = useCodeStore(state => state.headConfig);
    const bodyConfig = useCodeStore(state => state.bodyConfig);
    const htmlConfig = useCodeStore(state => state.htmlConfig);
    const cssResourceConfig = useCodeStore(state => state.cssResourceConfig);
    const jsResourceConfig = useCodeStore(state => state.jsResourceConfig);

    useEffect(() => {
        // 执行
        if (isRun) {
            setShowMask(false);
            const jsCode = getJsCode();
            const htmlCode = getHTMLCode();
            const cssCode = getCssCode();
            let cssResource = "";
            let jsResource = "";

            cssResourceConfig.forEach(item => {
                if (item !== "") cssResource += `<link rel="stylesheet" href="${item}">\n`;
            })

            jsResourceConfig.forEach(item => {
                if (item !== "") jsResource += `<script type="text/javascript" src="${item}"></script>\n`;
            })

            // 清空文档流
            iframeDiv!.current!.contentDocument?.close();
            iframeDiv!.current!.contentDocument?.open();
            console.log('[cssBaseConfig]', cssBaseConfig);
            console.log('[cssResource]')
            const templateHtml = `
                <!DOCTYPE html>
                <html lang="en" ${htmlConfig ? 'class='+ '"'+ htmlConfig + '"' : ""}>
                ${headConfig.split("</head>")[0]}
                    ${ cssBaseConfig === 'reset' ? "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css'>" : ""}
                    ${ cssBaseConfig === 'normalize' ? "<link rel='stylesheet' href='https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css'>" : ""}
                    ${ cssResource }
                    ${ jsResource }
                    <style>
                        ${cssCode}
                    </style>
                </head>
                <body ${bodyConfig ? 'class='+ '"'+ bodyConfig + '"' : ""}>
                    ${htmlCode}
                    <script>
                        ${jsCode}
                    </script> 
                </body>
                </html>
            `
            
            iframeDiv!.current!.contentDocument?.write(templateHtml);
            runCode(false);
        }
    }, [isRun])

    const maskRun = () => {
        setShowMask(false);
        runCode(true);
    }

    return (
        <div className="relative h-full w-full">
            { isShowMask && <div 
                className="absolute w-full h-full bg-black bg-opacity-60 flex items-center justify-center flex-col"
            >
                <div className="cursor-pointer text-4xl select-none" onClick={maskRun}>
                    <IconPlayCircle/>
                </div>
                <div className="cursor-pointer text-xl font-tencent select-none" onClick={maskRun}>
                    点击运行查看效果
                </div>
            </div> }
            <iframe className="h-full w-full" ref={iframeDiv}/>
        </div>
    )
}
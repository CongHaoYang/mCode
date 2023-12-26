import React, { useEffect, useState } from "react";
import { Input, Radio, Button } from "@arco-design/web-react";
import { IconPlus, IconClose } from "@arco-design/web-react/icon";
import defaultConfig from "./defaultValue";
import { useCodeStore } from "@/store";
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

const SettingMenuItem: React.FC<SettingProps> = ({type}) => {
    const setHeadStoreConfig = useCodeStore(state => state.setHeadConfig);
    const setBodyStoreConfig = useCodeStore(state => state.setBodyConfig);
    const setHtmlStoreConfig = useCodeStore(state => state.setHtmlConfig);
    const setCssBaseStoreConfig = useCodeStore(state => state.setCssBaseConfig);
    const setCssResourceConfig = useCodeStore(state => state.setCssResourceConfig);
    const setJsResourceConfig = useCodeStore(state => state.setJsResourceConfig);
    const [headConfig, setHeadConfig] = useState<string>(defaultConfig.Markup.head);
    const [htmlConfig, setHtmlConfig] = useState<string>(defaultConfig.Markup.html);
    const [bodyConfig, setBodyConfig] = useState<string>(defaultConfig.Markup.body);
    const [baseCssConfig, setBaseCssConfig] = useState<string>(defaultConfig.Style.base);
    const [baseCssResource, setBaseCssResource] = useState<string[]>(defaultConfig.Style.resource);
    const [baseJsResource, setBaseJsResource] = useState<string[]>(defaultConfig.Script.resource);

    const headInputChange = (value: string, e: any) => {
        setHeadConfig(value);
        setHeadStoreConfig(value);
    };
    const htmlInputChange = (value: string, e: any) => {
        setHtmlConfig(value);
        setHtmlStoreConfig(value);
    };
    const bodyInputChange = (value: string, e: any) => {
        setBodyConfig(value);
        setBodyStoreConfig(value);
    };
    const onChangeRadio = (value: string, event: any) => {
        console.log('[value]', value);
        setBaseCssConfig(value);
        setCssBaseStoreConfig(value);
    }
    const onDeleteCssResource = (index: number) => {
        return () => {
            setBaseCssResource(resource => {
                const newResource = [...resource];
                newResource.splice(index, 1);
                setCssResourceConfig(newResource)
                return newResource
            })
        }
    }

    const onCssResourceChange = (index: number) => {
    
        return (value: string, event: any) => {
            console.log('[value]', value);
            setBaseCssResource(resource => {
                const newResource = [...resource];
                newResource[index] = value;
                setCssResourceConfig(newResource);
                return newResource;
            });
        
        }
    }

    const onClickAddCssResource = () => {
        setBaseCssResource(resource => {
            const newResource = [...resource, ""];
            setCssResourceConfig(newResource);
            return newResource;
        });
    }

    const onClickAddJsResource = () => {
        setBaseJsResource(resource => {
            const newResource = [...resource, ""];
            setJsResourceConfig(newResource);
            return newResource;
        });
    }

    const onDeleteJsResource = (index: number) => {
        return () => {
            setBaseJsResource(resource => {
                const newResource = [...resource];
                newResource.splice(index, 1);
                setJsResourceConfig(newResource);
                return newResource
            })
        }
    }

    const onJsResourceChange = (index: number) => {
    
        return (value: string, event: any) => {
            
            setBaseJsResource(resource => {
                const newResource = [...resource];
                newResource[index] = value;
                setJsResourceConfig(newResource);
                return newResource;
            });
        
        }
    }

    

    switch(type) {
        case "Markup":
            return (
            <div className="flex h-full w-full items-start flex-col pl-10">
                <div className="pb-6">
                    <div className="pb-3 text-base">&lt;head&gt; 配置</div>
                    <TextArea 
                        placeholder="" 
                        value={headConfig}
                        className="resize-none"
                        style={{ minHeight: 150, maxHeight: 150, width: 350 }}
                        onChange={headInputChange}
                    />
                </div>
                <div className="pb-6 text-base">
                    <div className="pb-3">&lt;html&gt; class配置</div>
                    <Input 
                        style={{ width: 350 }} 
                        value={htmlConfig} 
                        allowClear 
                        placeholder='请填写html标签的class' 
                        onChange={htmlInputChange}
                    />
                </div>
                <div className="pb-6 text-base">
                    <div className="pb-3">&lt;body&gt; class配置</div>
                    <Input 
                        style={{ width: 350 }} 
                        value={bodyConfig} 
                        allowClear  
                        placeholder='请填写body标签的class' 
                        onChange={bodyInputChange}
                    />
                </div>
            </div>);
        case "Style":
            return (
                <div className="flex h-full w-full items-start flex-col pl-10">
                    <div className="pb-6">
                        <div className="pb-3 text-base">基础样式</div>
                        <RadioGroup 
                            direction='vertical' 
                            value={baseCssConfig}
                            onChange={onChangeRadio}
                        >
                            <Radio value='reset'>reset.css</Radio>
                            <Radio value='normalize'>normalize.css</Radio>
                            <Radio value='none'>不需要</Radio>
                        </RadioGroup>
                    </div>
                    <div className="pb-6">
                        <div className="pb-3 text-base">添加依赖资源</div>
                        <div className="flex flex-col items-start">
                            {
                                baseCssResource.map((resourceItem, index) => {
                                    return (
                                        <div key={index}>
                                            <Input 
                                                style={{ width: 350 }} 
                                                className="mb-3"
                                                value={resourceItem} 
                                                allowClear  
                                                placeholder='请填写body标签的class' 
                                                onChange={onCssResourceChange(index)}
                                            />
                                            <IconClose 
                                                className="ml-3 cursor-pointer"
                                                onClick={onDeleteCssResource(index)}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <Button
                                onClick={onClickAddCssResource}
                                type='text'
                            >
                                {<IconPlus />}添加新资源
                            </Button>
                        </div>
                    </div>
                </div>);
        case "Script":
            return (
                <div className="flex h-full w-full items-start flex-col pl-10">
                    <div className="pb-6">
                        <div className="pb-3 text-base">添加依赖资源</div>
                        <div className="flex flex-col items-start">
                            {
                                baseJsResource.map((resourceItem, index) => {
                                    return (
                                        <div key={index}>
                                            <Input 
                                                style={{ width: 350 }} 
                                                className="mb-3"
                                                value={resourceItem} 
                                                allowClear  
                                                placeholder='请填写body标签的class' 
                                                onChange={onJsResourceChange(index)}
                                            />
                                            <IconClose 
                                                className="ml-3 cursor-pointer"
                                                onClick={onDeleteJsResource(index)}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <Button
                                onClick={onClickAddJsResource}
                                type='text'
                            >
                                {<IconPlus />}添加新资源
                            </Button>
                        </div>
                    </div>
                </div>);
        default:
            return null;
    }
}

export default SettingMenuItem;
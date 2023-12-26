import React from "react";
import { config } from "./type.config.ts";
import { Select } from "@arco-design/web-react";
const Option = Select.Option;
import { useShowDialog } from "@/store/dialog.ts";
import { IconSettings, IconAttachment } from '@arco-design/web-react/icon';

interface TypeMap {
    [name: string]: SettingType
}

const typeMap: TypeMap = {
    "html": "Markup",
    "css": "Style",
    "javascript": "Script"
}

const EditorHeader: React.FC<EditorHeaderProps> = (props) => {
    const setSettingDialog = useShowDialog(state => state.setShow);
    const { type } = props;
    const configItem = config[type];
    const onClickSetting = () => {
        setSettingDialog(true, typeMap[type])
    }

    return (
        <div className="bg-m-normal w-full h-10 flex px-4 justify-between">
            <div className="flex items-center justify-around">
                <div dangerouslySetInnerHTML={{__html: configItem.svg}}></div>
                <div className="pl-6">
                    <Select
                        defaultValue={configItem.defaultValue}
                        size="small"
                    >
                        {configItem.options.map((option) => (
                          <Option key={option} value={option}>
                            {option}
                          </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex items-center">
                <div className="pr-3">
                    <IconAttachment/>
                </div>
                <div className="cursor-pointer" onClick={onClickSetting}>
                    <IconSettings />
                </div>
            </div>   
        </div>
    )
}

export default EditorHeader;
import styles from "./index.module.css";
import { Avatar, Space, Button } from '@arco-design/web-react';
import { IconPlayCircle, IconSettings } from '@arco-design/web-react/icon';
import { useRunCodeStore, useShowDialog } from "@/store";

export default function Header() {
    const runCode = useRunCodeStore(state => state.toRun);
    const setSettingDialog = useShowDialog(state => state.setShow);
    const onClickRunButton = () => {
        runCode(true);
    }
    const onClickSetting = () => {
        setSettingDialog(true, 'Markup')
    }

    return (
        <>
            <div className={`relative bg-m-normal flex items-center justify-between h-16 shadow-md border-b-0 ${styles.mHeader}`}>
                <div className="flex items-center">
                    <img className="h-10 w-24 pl-6" src="/milo.png"></img>
                    <div className="text-xl pl-6 font-tencent">mCode playground</div>
                </div>
                <Space size='large' className="pr-6 select-none">
                    <div className="text-2xl cursor-pointer" onClick={onClickSetting}>
                        <IconSettings />
                    </div>
                    <Button 
                        shape='round' 
                        type='primary' 
                        size='default'
                        icon={<IconPlayCircle/>}
                        className="cursor-pointer"
                        onClick={onClickRunButton}
                    >
                        运行
                    </Button>
                    <Avatar>E</Avatar>
                </Space>
            </div>
        </>
    )
}
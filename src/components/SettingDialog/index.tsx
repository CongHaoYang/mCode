import { useState, useEffect } from 'react';
import { Modal, Menu, } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import { useShowDialog } from '@/store';
import SettingMenuItem from './SettingMenuItem';
import styles from "./index.module.css";
const MenuItem = Menu.Item;

const SettingDialog = () => {
    const isShow = useShowDialog(state => state.isShow);
    const type = useShowDialog(state => state.type);
    const [itemType, setItemType] = useState<SettingType>("Markup");
    const setSettingDialog = useShowDialog(state => state.setShow);
    const titleNode = <div className='flex flex-row items-center justify-start'>
        <IconSettings/>
        <div>设置</div>
    </div>
    const setVisible = (status: boolean) => {
        setSettingDialog(status, 'Markup');
    }
    const MenuData = [
        {key: "Markup", title: "Markup"},
        {key: "Style", title: "Style"},
        {key: "Script", title: "Script"},
        // {key: "Base", title: "基础设置"},
        // {key: "Save", title: "存储设置"},
        // {key: "Edit", title: "编辑器设置"},
    ]

    useEffect(() => {
        console.log('[type]', type)
        // 只有选择不同的设置按钮才改变
        setItemType(type);
    }, [type])

    const onClickMenuItem = (key: string, event: any, keyPath: string[]) => {
        setItemType(key as SettingType);
    }

    return (
        <Modal
            title = {titleNode}
            visible = {isShow}
            className = 'w-180 h-150 modal-demo-without-content-spacing bg-m-normal'
            onCancel={() => setVisible(false)}
            footer = {null}
        >
            <div className='w-full h-full flex'>
                <div className={`relative h-full w-1/5 ${styles.divide}`}>
                    <Menu
                        style={{padding: 0}}
                        selectedKeys={[itemType]}
                        className="bg-m-normal"
                        onClickMenuItem={onClickMenuItem}
                    >
                        {
                            MenuData.map(mapItem => (
                                <MenuItem className={`${styles.menuItem}`} key={mapItem.key}>
                                    {mapItem.title}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </div>

                <div className='h-full flex-1 p-3'>
                    <SettingMenuItem type={itemType}></SettingMenuItem>
                </div>
            </div>
        </Modal>
    )
}

export default SettingDialog;
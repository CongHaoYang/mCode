import styles from "./index.module.css";
import { IconQuestionCircle } from "@arco-design/web-react/icon";

export default function Aside() {
    return (
        <>
            <div 
                className={`relative bg-m-normal items-center w-12 h-full border-r-0 flex flex-col justify-between ${styles.mAside}`}
            >
                {/* 工具栏 */}
                <div></div>
                <div className="text-xl pb-4 cursor-pointer">
                    <IconQuestionCircle />
                </div>
                
            </div>
        </>
    )
}
type SettingType = "Markup" | "Style" | "Script";

interface EditorToolProps {
    defaultLanguage: 'javascript' | 'css' | 'html',
    defaultValue: string
}

interface EditorHeaderProps {
    type: 'javascript' | 'css' | 'html'
}

interface SettingProps {
    type: SettingType
}

type EditorProps = EditorHeaderProps & EditorToolProps
import { create } from "zustand";

interface CodeStore {
    htmlCode: string;
    cssCode: string;
    jsCode: string;
    headConfig: string;
    bodyConfig: string;
    htmlConfig: string;
    cssBaseConfig: string;
    cssResourceConfig: string[];
    jsResourceConfig: string[];
    setCssResourceConfig: (resource: string[]) => void;
    setJsResourceConfig: (resource: string[]) => void;
    setHeadConfig: (code: string) => void;
    setBodyConfig: (code: string) => void;
    setHtmlConfig: (code: string) => void;
    setCssBaseConfig: (base: string) => void;
    setHTMLCode: (code: string) => void;
    getHTMLCode: () => string;
    setCssCode: (code: string) => void;
    getCssCode: () => string;
    setJsCode: (code: string) => void;
    getJsCode: () => string;
}

interface RunCodeStore {
    isRun: boolean;
    toRun: (status: boolean) => void;
}

const useRunCodeStore = create<RunCodeStore>((set) => ({
    isRun: false,
    toRun: (status: boolean) => {
        set((state) => ({ isRun: status}))
    }
})) 

const useCodeStore = create<CodeStore>((set, get) => ({
  jsCode: "",
  cssCode: "",
  htmlCode: "",
  headConfig: "",
  bodyConfig: "",
  htmlConfig: "",
  cssBaseConfig: "",
  cssResourceConfig: [],
  jsResourceConfig: [],
  setCssResourceConfig: (resource: string[]) => {
    set((state) => ({ cssResourceConfig : resource }))
  },
  setJsResourceConfig: (resource: string[]) => {
    set((state) => ({ jsResourceConfig : resource }))
  },
  setCssBaseConfig: (base: string) => {
    set((state) => ({ cssBaseConfig : base }))
  },
  setHeadConfig: (code: string) => {
    set((state) => ({ headConfig : code }))
  },
  setBodyConfig: (code: string) => {
    set((state) => ({ bodyConfig : code }))
  },
  setHtmlConfig: (code: string) => {
    set((state) => ({ htmlConfig : code }))
  },
  setJsCode: (code) => {
    set((state) => ({ jsCode: code }));
  },
  getJsCode: () => {
    return get().jsCode;
  },
  setCssCode: (code) => {
    set((state) => ({ cssCode: code }));
  },
  getCssCode: () => {
    return get().cssCode;
  },
  setHTMLCode: (code) => {
    set((state) => ({ htmlCode: code }));
  },
  getHTMLCode: () => {
    return get().htmlCode;
  }
}));

export { useCodeStore, useRunCodeStore };
import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    setIsAddingEntry: ( value: boolean ) => void;
    setIsDraggingEntry: ( value: boolean ) => void;
}

export const UIContext = createContext({} as ContextProps)
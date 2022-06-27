import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDraggingEntry: false,
}

interface Props {
    children?: ReactNode
}

export const UIProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSidebar = () => {
        dispatch( { type: 'UI - Open Sidebar' } )
    };

    const closeSidebar = () => {
        dispatch( { type: 'UI - Close Sidebar' } )
    };

    const setIsAddingEntry = ( value: boolean ) => {
        dispatch({ type: 'UI - Toggle Input Entry', payload: value } )
    }

    const setIsDraggingEntry = ( value: boolean ) => {
        dispatch({ type: 'UI - Toggle Dragging Entry', payload: value } )
    }

    return (
        <UIContext.Provider value={{ 
            ...state,
            openSidebar,
            closeSidebar,
            setIsAddingEntry,
            setIsDraggingEntry
        }}>
            { children }
        </UIContext.Provider>
    )
}
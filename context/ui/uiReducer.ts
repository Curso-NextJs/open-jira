import { UIState } from './';

type UIActionType =
| { type: 'UI - Open Sidebar' } 
| { type: 'UI - Close Sidebar' } 
| { type: 'UI - Toggle Input Entry', payload: boolean } 
| { type: 'UI - Toggle Dragging Entry', payload: boolean } 

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            };

        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false
            };

        case 'UI - Toggle Input Entry':
            return {
                ...state,
                isAddingEntry: action.payload
            };

        case 'UI - Toggle Dragging Entry':
            return {
                ...state,
                isDraggingEntry: action.payload
            };

        default:
            return state;
    }
}
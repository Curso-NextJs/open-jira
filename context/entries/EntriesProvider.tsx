import { FC, ReactNode, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import entriesApi from '../../apis/entriesApi';
import { EntriesContext, EntriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props {
    children?: ReactNode
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entries] - Add Entry', payload: newEntry })
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entries] - Update Entry', payload: entry })
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entries] - Refresh Entries', payload: data })
    }

    return (
        <EntriesContext.Provider value={{ 
            ...state,
            addNewEntry,
            updateEntry
        }} >
            { children }
        </EntriesContext.Provider>
    )
}
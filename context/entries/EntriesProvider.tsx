import { FC, ReactNode, useEffect, useReducer } from 'react';

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

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entries] - Add Entry', payload: data})
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

    const updateEntry = async ( { _id, description, status }: Entry ) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: '[Entries] - Update Entry', payload: data });
        } catch (error) {
            console.log(error);
        }

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
import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryListItem } from './';
import { EntryStatus } from "../../interfaces";

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDraggingEntry, setIsDraggingEntry } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [entries, status])

    const onDropEvent = ( event: DragEvent ) => {
        const id = event.dataTransfer.getData('text')
        const entry = entries.find( entry => entry._id === id )!;
        entry.status = status;
        updateEntry(entry);
        setIsDraggingEntry(false);
    }

    const allowDrop = ( event: DragEvent ) => {
        event.preventDefault()
    }

    return (
        <div
            onDrop={ onDropEvent }
            onDragOver={ allowDrop }
            className={ isDraggingEntry ? styles.dragging : '' }
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '10px'  }}>
                <List sx={{ opacity: isDraggingEntry ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryListItem key={ entry._id } entry={ entry } />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}

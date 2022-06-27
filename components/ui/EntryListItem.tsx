import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry
}

export const EntryListItem: FC<Props> = ({ entry }) => {

    const { setIsDraggingEntry } = useContext(UIContext)

    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id);
        setIsDraggingEntry( true );
    }   

    const onDragEnd = ( event: DragEvent ) => {
        setIsDraggingEntry( false );
    }   

    return (
        <Card
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            draggable 
            sx={{ marginBottom: 1 }} 
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry
}

export const EntryListItem: FC<Props> = ({ entry }) => {

    const { setIsDraggingEntry } = useContext(UIContext)
    const router = useRouter();

    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id);
        setIsDraggingEntry( true );
    }   

    const onDragEnd = ( event: DragEvent ) => {
        setIsDraggingEntry( false );
    }   

    const onClick = () => {
        router.push(`/entries/${ entry._id }`);
    }

    return (
        <Card
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            draggable 
            sx={{ marginBottom: 1 }} 
            onClick={ onClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
                    <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow(entry.createdAt) }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

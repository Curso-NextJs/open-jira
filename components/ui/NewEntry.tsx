import { ChangeEvent, useState, useContext } from 'react';
import { Button, TextField, Box } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const cleanInputField = () => {
        setIsAddingEntry(false);
        setInputValue('');
        setIsTouched(false);
    }

    const onSaveHandler = () => {
        if( inputValue.length === 0 ) return;
        addNewEntry(inputValue);
        cleanInputField();
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>

            {
                isAddingEntry
                ?
                    <>
                        <TextField 
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={ inputValue.length <= 0 && isTouched && 'Ingrese un valor' }
                            error={ inputValue.length <= 0 && isTouched }
                            value={ inputValue }
                            onChange= { onTextFieldChange }
                            onBlur={ () => setIsTouched(true) }
                        />

                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                onClick={ cleanInputField }
                                variant="text"
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon= { <SaveOutlinedIcon /> }
                                onClick={ onSaveHandler }
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                    
                :
                    <Button
                        onClick={ () => setIsAddingEntry(true) }
                        fullWidth
                        variant="outlined"
                        endIcon= { <AddCircleOutlineOutlinedIcon /> }
                    >
                        Agregar Tarea
                    </Button>
                    
            }
            

            
        </Box>
    )
}

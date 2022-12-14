import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";

    if (!store.currentList) {
        addSongClass += " disabled";
        undoClass += " disabled";
        redoClass += " disabled";
        closeClass += " disabled";
    }

    const isModalOpen = store.isEditSongModalOpen() || store.isRemoveSongModalOpen();
    if (!store.canAddNewSong() || isModalOpen) addSongClass += "-disabled";;
    if (!store.canUndo() || isModalOpen) undoClass += "-disabled";
    if (!store.canRedo() || isModalOpen) redoClass += "-disabled";
    if (!store.canClose() || isModalOpen) closeClass += "-disabled";

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={handleAddNewSong}
                className={addSongClass}
                variant="contained">
                <AddIcon />
            </Button>
            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={handleUndo}
                className={undoClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={handleRedo}
                className={redoClass}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={handleClose}
                className={closeClass}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;
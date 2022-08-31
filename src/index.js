import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/style.css';
import { getInitialData, showFormattedDate } from './utils';

function Header ({ onChange }){    
    return(
        <div className="note-app__header">
            <h1>Notes</h1>
            <div className="note-search">
                <input type="text" placeholder="Cari catatan ..." onChange={onChange}/>
            </div>
        </div>
    );
}

class NoteInput extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          title: '',
          body: ''
        };
    
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.onAdd(this.state);
    }

    onTitleChangeHandler(event) {
        this.setState({
            title: event.target.value
        });
    }

    onBodyChangeHandler(event) {
        this.setState({
            body: event.target.value
        });
    }

    render() {
        return (
            <div className="note-input">
                <h2>Buat catatan</h2>
                <form onSubmit={this.onSubmitEventHandler}>
                    <p className="note-input__title__char-limit">Sisa karakter: </p>
                    <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeHandler} required/>
                    <textarea className="note-input__body" type="text" placeholder="Tuliskan catatanmu di sini ..." value={this.state.body} onChange={this.onBodyChangeHandler} required></textarea>
                    <button type="submit">Buat</button>
                </form>
            </div>
        )
    }
}

function NoteContent({ title, createdAt, body}) {
    return(
        <div className="note-item__content">
            <h3 className="note-item__title">{title}</h3>
            <p className="note-item__date">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{body}</p>
        </div>
    )
}

function NoteAction({ id, onDelete, onArchive }) {
    return(
        <div className="note-item__action">
            <button className="note-item__delete-button" onClick={() => onDelete(id)}>Delete</button>
            <button className="note-item__archive-button" onClick={() => onArchive(id)}>Arsipkan</button>
        </div>
    )
}

function Note({ id, title, body, createdAt, onDelete, onArchive }) {
    return(
        <div className="note-item">
            <NoteContent title={title} createdAt={createdAt} body={body}/>
            <NoteAction id={id} onDelete={onDelete} onArchive={onArchive}/>
        </div>
    )
}

function NotesList({notes, search, onDelete, onArchive }) {
    if (notes.length == 0) {
        return(
            <p className="notes-list__empty-message">Tidak ada catatan</p>
        );
    }

    if (search != null || search.length > 0) {
        notes = notes.filter((note) => (
            note.title.toLowerCase().includes(search.toLowerCase())
        ))
    }

    return(
        <div className="notes-list">
            {notes.map((note) => (
                <Note key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} {...note} />
            ))}
        </div>
    )
}


function Body({notes, search, onDelete, onAdd, onArchive}) {
    return(
        <div className="note-app__body">
            <NoteInput onAdd={onAdd}/>
            <h2>Catatan Aktif</h2>
            <NotesList notes={notes.filter((note) => !note.archived)} search={search} onDelete={onDelete} onArchive={onArchive}/>
            <h2>Arsip</h2>
            <NotesList notes={notes.filter((note) => note.archived)} search={search} onDelete={onDelete} onArchive={onArchive}/>
        </div>
    );
}

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          notes: getInitialData(),
          search: ''
        }
      
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onDeleteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });
    }

    onArchiveHandler(id) {
        const temp = this.state.notes;
        temp.forEach((note) => {
            if (note.id == id) {
                console.log(note.title);
                note.archived = !note.archived;
            }
        });
        this.setState({ temp });
    }
      
    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                ...prevState,
                notes: [
                ...prevState.notes,
                {
                    id: +new Date(),
                    title,
                    body,
                    createdAt: Date(),
                    archived: false
                }
            ]}
        });
    }

    onSearchHandler(event) {
        this.setState({ search: event.target.value });
    }
    
    render() {
        return(
            <div>
                <Header onChange={this.onSearchHandler}/>
                <Body notes={this.state.notes} search={this.state.search} onDelete={this.onDeleteHandler} onAdd={this.onAddNoteHandler} onArchive={this.onArchiveHandler}/>
            </div>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(<NotesApp/>);
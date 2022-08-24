import React from 'react';
import { createRoot } from 'react-dom/client';

// import style
import './styles/style.css';
import { getInitialData } from './utils';

function Header({ title }) {
    return (
        <div className="note-app__header">
            <h1>{title}</h1>
            <div className="note-search">
                <input type="text" placeholder="Cari catatan ..." value/>
            </div>
        </div>
    );
}

function NoteInput({ className, heading}) {
    return (
        <div className={className}>
            <h2>{heading}</h2>
            <form>
                <p className="note-input__title__char-limit">Sisa karakter: </p>
                <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." required value/>
                <textarea className="note-input__body" type="text" placeholder="Tuliskan catatanmu di sini ..." required></textarea>
                <button type="submit">Buat</button>
            </form>
        </div>
    )
}

function NoteContent({ title, createdAt, body}) {
    return(
        <div className="note-item__content">
            <h3 className="note-item__title">{title}</h3>
            <p className="note-item__date">{createdAt}</p>
            <p className="note-item__body">{body}</p>
        </div>
    )
}

function NoteAction() {
    return(
        <div className="note-item__action">
            <button className="note-item__delete-button">Delete</button>
            <button className="note-item__archive-button">Arsipkan</button>
        </div>
    )
}

function Note({ title, createdAt, body}) {
    return(
        <div className="note-item">
            <NoteContent title={title} createdAt={createdAt} body={body}/>
            <NoteAction/>
        </div>
    )
}

function NotesList() {
    //initial data
    const someNotes = getInitialData()

    return(
        <div className="notes-list">
            {someNotes.map((notes) => (
                <Note {...notes} key={notes.id}/>
            ))}
        </div>
    )   
}

function Body() {
    return(
        <div className="note-app__body">
            <NoteInput className="note-input" heading="Buat catatan"/>
            <h2>"Catatan Aktif"</h2>
            <NotesList/>
            <h2>"Arsip"</h2>
            <p className="notes-list__empty-message">Tidak ada catatan</p>
        </div>
    )
}

function NotesApp() {
    return(
        <div>
            <Header title="Notes"/>
            <Body/>
        </div>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<NotesApp/>);
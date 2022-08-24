import React from 'react';
import { createRoot } from 'react-dom/client';

// import style
import './styles/style.css';
import { getInitialData } from './utils';

// const headerHeading = React.createElement('h1', null, 'Notes');
// // const searchInput = React.createElement('input', null, 'Cari catatan ...');
// const searchContainer = React.createElement('div', null, [/*searchInput*/]);
// const headerContainer = React.createElement('div', null, [headerHeading, searchContainer]);

// const inputHeading = React.createElement('h2', null, 'Buat catatan');
// // const inputForm = React.createElement('form', null, null);
// const inputContainer = React.createElement('div', null, [inputHeading/*, inputForm*/]);

// const notesHeading = React.createElement('h2', null, 'Catatan Aktif');
// const notesContainer = React.createElement('div', null, [headerHeading, searchContainer]);

// const archiveHeading = React.createElement('h2', null, 'Arsip');
// const archiveContainer = React.createElement('p', null, 'Tidak ada catatan');

// const bodyContainer = React.createElement('div', null, [inputContainer, notesHeading, notesContainer, archiveHeading, archiveContainer]);

// const rootContainer = React.createElement('div', null, [headerContainer, bodyContainer]);

const element = (
    <><div className="note-app__header">
        <h1>Notes</h1>
        <div className="note-search">
            <input type="text" placeholder="Cari catatan ..." value/>
        </div>
    </div><div className="note-app__body">
            <div className="note-input">
                <h2>Buat catatan</h2>
                <form>
                    <p className="note-input__title__char-limit">
                        "Sisa karakter: "
                        "50"
                    </p>
                    <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." required value>
                        <textarea className="note-input__body" type="text" placeholder="Tuliskan catatanmu di sini ..." required></textarea>
                        <button type="submit">Buat</button>
                    </input>
                </form>
            </div>
            <h2>Catatan Aktif</h2>
            <div className="notes-list"></div>
            <h2>Arsip</h2>
            <p className="notes-list__empty-message">Tidak ada catatan</p>
        </div></>
);

function Input({ className, type, placeholder, isRequired}) {
    if (isRequired === "true") return (
        <input className={className} type={type} placeholder={placeholder} required value/>
    );
    else (
        <input type={type} placeholder={placeholder} value/>
    );
}

function Paragraph({ className, content }) {
    return (
        <p className={className}>{content}</p>
    )
}

function Heading2({ content }) {
    <h2>{content}</h2>
}

function Header({ title }) {
    return (
        <div className="note-app__header">
            <h1>{title}</h1>
            <div className="note-search">
                <Input className="" type="text" placeholder="Cari catatan ..." isRequired="false"/>
            </div>
        </div>
    );
}

function NoteInput({ className, heading}) {
    return (
        <div className={className}>
            <Heading2 content={heading}/>
            <form>
                <Paragraph className="note-input__title__char-limit" content="Sisa karakter: "/>
                <Input className="note-input__title" type="text" placeholder="Ini adalah judul ..." isRequired="true"/>
                <textarea className="note-input__body" type="text" placeholder="Tuliskan catatanmu di sini ..." required></textarea>
                <button type="submit">Buat</button>
            </form>
        </div>
    )
}

function NotesList() {
    <div className="notes-list"></div>
}

function Body() {
    return(
        <div className="note-app__body">
            <NoteInput className="note-input" heading="Buat catatan"/>
            <Heading2 content="Catatan Aktif"/>
            <NotesList/>
            <Heading2 content="Arsip"/>
            <Paragraph className="notes-list__empty-message" content="Tidak ada catatan"/>
        </div>
    )
}

function Notes() {
    //initial data
    const someNotes = getInitialData()

    return(
        <div>
            <Header title="Notes"/>
            <Body/>
        </div>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<Notes/>);
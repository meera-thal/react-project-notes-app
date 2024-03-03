
import './App.css';
import { useState } from 'react';

export default function App() {
  const [savedNotes, setSavedNotes] = useState('')
  const [searchResult, setSearchResult]=useState('')
  return <div className='container' >
   <Header savedNotes={savedNotes} setSavedNotes={setSavedNotes} searchResult={searchResult} setSearchResult={setSearchResult}/>
   {/* {!searchResult && <ShowSavedNotes savedNotes={savedNotes} setSavedNotes={setSavedNotes} />} */}
    <ShowSavedNotes savedNotes={savedNotes} setSavedNotes={setSavedNotes} />
  </div>
}


function Header({savedNotes,setSavedNotes, searchResult, setSearchResult}){
  
  return <header>
    <div className='logo'>
    <h1>Note Keeping</h1>
    </div>
    <div className='header-right'>
    <Search savedNotes={savedNotes} setSavedNotes={setSavedNotes} searchResult={searchResult} setSearchResult={setSearchResult}/>
    {/* <input type="text" name="" id="" placeholder='search' /> */}
    <CreateNote savedNotes={savedNotes} setSavedNotes={setSavedNotes} />
    
   
    </div>
  </header>
}



function Search({savedNotes, setSavedNotes, searchResult, setSearchResult}){
const [search, setSearch] = useState('')

  function handleSearch(e){
    e.preventDefault()
   const filteredNote = savedNotes.filter(note=>note.title.includes(search) || note.content.includes(search))
   setSearchResult(filteredNote)
   console.log(filteredNote)
  }
 function handleDelete(){
  setSearch('')
  setSearchResult('')
 }
  return <div>
  <form onSubmit={handleSearch}>
  <input type="text" className='search-box' id="" placeholder='search'  value={search} onChange={(e)=>setSearch(e.target.value)}
  />
  </form>
  
  {searchResult && <div className='create-popup'>
    <h3>Search Result</h3>
    {searchResult.map((saved)=><div className='saved-notes' key={saved.id}>
        
        <div className='saved-note'>
        <h3>{saved.title}</h3>
        <h4>{saved.date}</h4>
        <p>{saved.content}</p>
        
    </div>
    

    </div>)}
    <button className='btn-close-note'onClick={handleDelete}>❌</button>
  </div>}

  </div>


}

function CreateNote({savedNotes, setSavedNotes}){

const [popUp, setpopUp] = useState(false)
const [date, setDate] = useState('')
const [title, setTitle] = useState('')
const [content, setContent] = useState('')

function handleCreateNote(){
  setpopUp(true)}

function handleClose(){
    setpopUp(false)
  }

function handleSave(e){
  e.preventDefault()
  const newNote = {date,title, content, id:crypto.randomUUID()}
  setSavedNotes((notes)=>[...notes,newNote])
  setpopUp(false)
  setDate('')
  setTitle('')
  setContent('')
 }


return <div>
    {popUp &&
    <div className='create-popup '>
      <div>
      <button className='btn-close' onClick={handleClose}>❌</button>  
  <input type="text" className='date-field' placeholder='Date'  value={date} onChange={(e)=>setDate(e.target.value)}/>
  <input type="text" className='title-field'placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      </div>
  <textarea className='textTyping' type="text" placeholder='Type your note here...' value={content} onChange={(e)=>setContent(e.target.value)}/>
  <button className='btn-save' onClick={handleSave}>save</button>
    </div>
   
  }
  <button onClick={handleCreateNote}>Create</button>
  </div>
}



function ShowSavedNotes({savedNotes,setSavedNotes}){
  const [noteOpen, setNoteOpen] = useState(false)
 const [openId, setOpenId] = useState('')

  function handleDelete(saved){
   setSavedNotes( savedNotes.filter(note=>note.id!==saved.id))
   setNoteOpen(false)
  }
 function HandleNoteOpen(saved){
  setOpenId(saved.id);
  console.log(saved.id)
  console.log(openId)
 setNoteOpen(true)
 }
  return <div>
    {savedNotes && savedNotes.map((saved)=><div className='saved-notes' key={saved.id}>
        
      <div className='saved-note'>
      {!noteOpen &&<h3 className='saved-title'>{saved.title}</h3>}
      {!noteOpen && <h4 className='saved-date'>{saved.date}</h4>}
      {!noteOpen && <p className='saved-content'>{(saved.content)}</p>}
      {noteOpen && (saved.id===openId && <p>{saved.content}</p>)}
      {noteOpen && <button className='btn-close-note'onClick={()=>handleDelete(saved)}>❌</button>}

    </div>
    <button className='btn-class-open' onClick={()=>HandleNoteOpen(saved)}>→</button>
    
    
    </div>)}
  </div>
  
}
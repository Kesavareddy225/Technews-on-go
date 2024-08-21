import { useContext } from 'react';
import './Header.css'
import { AppContext } from '../store/context-store';

const Header=()=>{

  const {query,searchPost}=useContext(AppContext);

  return <>

    <div className="header">
      <center>
        <h2>Tech News on go</h2>
      <input className="input" type="text" placeholder="Search here...." value={query}
       onChange={(event)=>searchPost(event.target.value)}/>
      </center>
    </div>
  </>
}

export default Header;
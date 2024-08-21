import { useContext } from "react";
import { AppContext } from "../store/context-store";
import './Pagenation.css'

const Pagenation =()=> {
  const  {page,nbPages,next_page,prev_page}=useContext(AppContext);
  return (
    <center>
      <div className="page-container">
        <button onClick={()=>prev_page()}>PREV</button>
        <span>{page+1} of {nbPages}</span>
        <button onClick={()=>next_page()}>NEXT</button>
      </div>
    </center>
  );
}

export default Pagenation;
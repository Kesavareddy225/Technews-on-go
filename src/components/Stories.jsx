import { useContext } from "react";
import { AppContext } from "../store/context-store";
import './Stories.css'

const Stories = () => {

  const {hits,nbPages,isLoading,remove_post}=useContext(AppContext);
  if(isLoading)
  {
    return (
      <center>
        <h2>Loading..!</h2>
      </center>
    );
  }
  return (
    <>
      {hits.map(post=>{ 

        const {author,num_comments,objectID,title,url}=post;
        return (
          <>
            <div className="card" >
              <h3>{title}</h3>
              <p>
                By <span><b>{author}</b></span> | <span><b>{num_comments}</b></span> comments
              </p>

              <div className="bottom">
                <button className="btn"><a href={url} target="_blank" className="read">
                  Read more
                </a></button>
                <button className="btn remove" onClick={()=>remove_post(objectID)}>
                  Remove</button>
              </div>
            </div>
          
          </>
        );
      })}
    </>
  )
}

export default Stories;
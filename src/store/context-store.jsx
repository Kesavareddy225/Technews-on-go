import { useReducer,useEffect } from "react";
import { createContext } from "react";

let API="https://hn.algolia.com/api/v1/search?";

let initialState=
  {
    isLoading:true,
    query:"",
    title:"",
    page:0,
    nbPages:0,
    hits:[],
  };

export const AppContext=createContext();

const reducer=(state,action)=>{
  switch(action.type){
    case "SET_LOADING":
      return {
        ...state,
        isLoading:true,
      }
    case "GET_POST":
      return {
        ...state,
        
        isLoading:false,
        hits:action.payload.hits,
        nbPages:action.payload.nbPages,
      };
    case "DELETE_POST":
      return {
        ...state,
        hits:state.hits.filter((currPost)=>currPost.objectID!==action.payload)
      }

    case "SEARCH_POST":
      return{
        ...state,
        query:action.payload,
      }
      
    case "PREV_PAGE":
      let pageNum=state.page;
      if(pageNum<=0)
      {
        pageNum=0;
      }
      else{
        pageNum=state.page-1;
      }
      return {
        ...state,
        page:pageNum
      }

      case "NEXT_PAGE":
      let pageInc=state.page+1;
      if(pageInc>=state.nbPages)
      {
        pageInc=0;
      }
      else{
        pageInc=state.page+1;
      }
      return {
        ...state,
        page:pageInc
      }
  }

  return state;
}


const AppContextProvider=({children})=>{

  const [state,dispatch]=useReducer(reducer,initialState);

  const fetchApiData=async(url)=>{

    dispatch({
      type:"SET_LOADING",
    });
    try{
      let res=await fetch(url);
      let data=await res.json();
      console.log(data);
    dispatch (
        {
          type:"GET_POST",
          payload:
          {
            hits:data.hits,
            nbPages:data.nbPages,
          }
        }
      );
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  },[state.query,state.page]);

  const remove_post=(postId)=>{
    dispatch(
      {
        type:"DELETE_POST",
        payload: postId,
      }
    );
  }

  const searchPost=(searchQuery)=>{
    console.log("search post")
    dispatch(
      {
        type:"SEARCH_POST",
        payload:searchQuery,
      }
    );
  }

  const next_page =()=>{
    dispatch(
      {
        type:"NEXT_PAGE",
      }
    );
  }

  const prev_page =()=>{
    dispatch(
      {
        type:"PREV_PAGE",
      }
    );
  }

  return (
    <AppContext.Provider value={{...state,remove_post,searchPost,next_page,prev_page}}>
      {children}
    </AppContext.Provider>
  );
}


export default AppContextProvider;
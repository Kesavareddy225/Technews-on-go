import Header from "./components/Header"
import Pagenation from "./components/Pagenation";
import Stories from "./components/Stories";
import AppContextProvider from './store/context-store'

function App() {

  return (
    <AppContextProvider>
      
      <Header></Header>
      <Pagenation></Pagenation>
      <Stories></Stories>
    </AppContextProvider>
  )
}

export default App;

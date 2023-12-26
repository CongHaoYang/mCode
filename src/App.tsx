import Main from "@/layout/Main";
import Aside from "@/layout/Aside";
import Header from "./layout/Header";

function App() {

  return (
    <>
      <div className='h-full'>
        <Header></Header>
        <div className="h-[calc(100%-4rem)] flex">
          <Aside></Aside>
          <Main></Main>
        </div>
      </div>
    </>
  )
}

export default App

import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News  from './components/News';
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const router = createBrowserRouter([
  { path: "/", Component: Navbar },
  { path: "/", Component: News },
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const pageSize = 7;
  const apiKey= process.env.REACT_APP_NEWS_API

  const [progress,setProgress] = useState(0)

  function updateProgress(progressO){
    setProgress(progressO)
  }

  return (
    <div>
      <LoadingBar 
      height={3}
      color='#f11946'
      progress={progress}
      // onLoaderFinished={()=> setProgress(0)}
      />
      
      <Navbar />
      <Routes>

        <Route key="home" exact path='/' element={<News setProgress={updateProgress} apiKey={apiKey} key='general' pageSize={pageSize} country='us' category='general' />}></Route>
       
        <Route key="general" exact path='/general' element={<News setProgress={updateProgress} apiKey={apiKey} key='general' pageSize={pageSize} country='us' category='general' />}></Route>

        <Route key="business" exact path='/business' element={<News setProgress={updateProgress} apiKey={apiKey} key='business' pageSize={pageSize} country='us' category='business' />}></Route>

        <Route key="entertainment" exact path='/entertainment' element={<News setProgress={updateProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country='us' category='entertainment' />}></Route>

        <Route key="health" exact path='/health' element={<News setProgress={updateProgress} apiKey={apiKey} key='health' pageSize={pageSize} country='us' category='health' />}></Route>

        <Route key="science" exact path='/science' element={<News setProgress={updateProgress} apiKey={apiKey} key='science' pageSize={pageSize} country='us' category='science' />}></Route>

        <Route key="sports" exact path='/sports' element={<News setProgress={updateProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country='us' category='sports' />}></Route>

        <Route key="technology" exact path='/technology' element={<News setProgress={updateProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country='us' category='technology' />}></Route>

      </Routes>

    </div>
  )
}
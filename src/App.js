import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";


const router = createBrowserRouter([
  // { path: "/", Component: Navbar },
  // { path: "/", Component: News },
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {

  return (
    <div>
      <Navbar />
      <Routes>

        <Route key="general" exact path='/general' element={<News key='general' pageSize={5} country='us' category='general' />}></Route>

        <Route key="business" exact path='/business' element={<News key='business' pageSize={5} country='us' category='business' />}></Route>

        <Route key="entertainment" exact path='/entertainment' element={<News key='entertainment' pageSize={5} country='us' category='entertainment' />}></Route>

        <Route key="health" exact path='/health' element={<News key='health' pageSize={5} country='us' category='health' />}></Route>

        <Route key="science" exact path='/science' element={<News key='science' pageSize={5} country='us' category='science' />}></Route>

        <Route key="sports" exact path='/sports' element={<News key='sports' pageSize={5} country='us' category='sports' />}></Route>

        <Route key="technology" exact path='/technology' element={<News key='technology' pageSize={5} country='us' category='technology' />}></Route>

      </Routes>

    </div>
  )
}
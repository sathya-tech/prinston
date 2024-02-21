import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Campgrounds from './components/campground/Campgrounds';
import Show from './components/campground/Show';
import New from './components/campground/New';
import Edit from './components/campground/Edit'
import "bootstrap/dist/css/bootstrap.min.css";
import Boilerplate from './partials/Boilerplate';
import Register from './components/users/Register';
import Login from './components/users/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Boilerplate />}>
          <Route path='/campgrounds' element={<Campgrounds />} />
          <Route path='/campgrounds/:id' element={<Show />} />
          <Route path='/campgrounds/new' element={<New />} />
          <Route path='/campgrounds/:id/edit' element={<Edit />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

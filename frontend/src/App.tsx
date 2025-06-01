// import Home from './pages/Home';
import AddTherapyPage from './pages/Admin/CRUDS/Therapy/AddTherapy';
import ViewTherapiesPage from './pages/Admin/CRUDS/Therapy/ViewTherapies';
import EditTherapyPage from './pages/Admin/CRUDS/Therapy/EditTherapy';

function App() {

  return (
    <div>
          {/* <Home /> */}
          {<AddTherapyPage />}
          {<ViewTherapiesPage />}
          {<EditTherapyPage/>}
    </div>
  )
}

export default App

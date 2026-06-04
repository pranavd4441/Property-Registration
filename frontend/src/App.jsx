import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddProperty from './pages/AddProperty'
import Dashboard from './pages/Dashboard'
import EditProperty from './pages/EditProperty'
import PropertyDetail from './pages/PropertyDetail'
import PropertyList from './pages/PropertyList'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/add" element={<AddProperty />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties/:id/edit" element={<EditProperty />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

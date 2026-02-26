import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import RecipesPage from './pages/RecipesPage'
import RecipePage from './pages/RecipePage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

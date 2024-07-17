import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './views/IndexPage'
// import FavouritesPage from './views/FavouritesPage'
import Layout from './layouts/Layout'
import { lazy, Suspense } from 'react'


const FavouritesPage = lazy(() => import('./views/FavouritesPage'))
export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<IndexPage />} index/>
            <Route path="/favoritos" element={
              <Suspense fallback="Cargando..">
                <FavouritesPage />
              </Suspense>
            } />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

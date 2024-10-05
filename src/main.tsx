import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './routes/routes.tsx'

createRoot(document.getElementById('root')!).render(

  <RouterProvider router={Routes} />
)

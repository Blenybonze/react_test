import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './app/home'
import Dashboard from './app/dashboard'
import ProdutosListar from './app/dashboard/gerenciar-produtos/gerenciar.produtos'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/produtos/gerenciar" element={<ProdutosListar />} />
            </Routes>
        </BrowserRouter>
    )
}


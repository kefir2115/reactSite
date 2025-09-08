import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginApp from './login/LoginApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginApp recovery={false} />} />
            <Route path="/recovery" element={<LoginApp recovery />} />
        </Routes>
    </BrowserRouter>
);
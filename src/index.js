import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import bridge from '@vkontakte/vk-bridge';

// Инициализируем VK Bridge
bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
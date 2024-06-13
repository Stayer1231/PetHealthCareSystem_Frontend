import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { AuthProvider } from './config/provider/AuthProvider.jsx'
import store from './config/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
  // </React.StrictMode>,
)

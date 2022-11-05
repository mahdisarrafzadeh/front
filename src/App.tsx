import './App.less';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import Home from './page/home';
import { LoginPage } from './page/login';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

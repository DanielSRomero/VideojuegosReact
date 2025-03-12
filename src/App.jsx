import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import VideoGamePage from './components/VideoGamePage';
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";


function App() {


    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/lista" element={<Layout />}>
                        <Route index element={<VideoGamePage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { AdminProtect } from "./components/Private";

// Lazy
const BookPage = lazy(() => import("./Pages/BookPage"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AudioBooks = lazy(() => import("./Pages/AudioBooks"));
const EBooks = lazy(() => import("./Pages/EBooks"));
const Create = lazy(() => import("./Pages/Create"));
const Profile = lazy(() => import("./Pages/Profile"));
const Favorite = lazy(() => import("./Pages/Favorite"));
const Private = lazy(() => import("./components/Private"));
const Admin = lazy(() => import("./Pages/Admin"));
const About = lazy(() => import("./Pages/About"));
const Update = lazy(() => import("./Pages/UpdatePost"));
const Subscription = lazy(() => import("./Pages/Subscription"));

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/audio-books" element={<AudioBooks />} />
          <Route path="/ebooks" element={<EBooks />} />
          <Route path="/about" element={<About />} />

          <Route element={<Private />}>
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/subscription" element={<Subscription />} />

            <Route element={<AdminProtect />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>

          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;

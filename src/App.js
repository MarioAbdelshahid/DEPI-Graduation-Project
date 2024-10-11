import Header from "./components/header/Header";

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/creat-post/CreatePost";
import PostDetails from "./pages/post-details/PostDetails";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer theme="colored" position="top-center"/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/create-post" element={<CreatePost />} />
          <Route path="/posts/details/:id" element={<PostDetails />} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/posts/categories/:category" element={<Category/>} />
          
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

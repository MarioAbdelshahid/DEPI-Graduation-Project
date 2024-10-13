import React, { useEffect } from "react";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/posts/sidebar/Sidebar";
import { posts, categories } from "../../dummyData";
import "./PostPage.css";
const PostsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="post-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
    </>
  );
};

export default PostsPage;



import "./profile.css";
import Header from "../../components/Header/Header"; 


import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  return (
    <>
      <Header />
      <div className="profile">
     
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Safak Kocaoglu</h4>
              <span className="profileInfoDesc">Welcome to my profile!</span>
            </div>
          </div>
          <div className="profileRightBottom">
          
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

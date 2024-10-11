import './rightbar.css';
import { Settings, Bookmark, Person, Mail, EventNote } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Online from "../online/Online";
import dummyData from '../dummyData'; // Adjust the path as necessary



export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <div className="homeRightbar">
        {/* قسم الطقس المباشر */}
        <div className="weatherContainer">
          <img className="weatherIcon" src="assets/sunny.png" alt="Weather" />
          <span className="weatherText">Sunny, 24°C</span>
        </div>

        {/* نصيحة يومية */}
        <div className="dailyTip">
          <p>"Keep pushing forward, success is near!"</p>
        </div>

        {/* أخبار سريعة */}
        <div className="newsTicker">
          <marquee>Latest News: Special discounts on this week’s offers!</marquee>
        </div>

        {/* إعلانات متحركة */}
        <div className="adSlideshow">
          <img src="assets/ad1.png" alt="Ad 1" className="adImage"/>
          <img src="assets/ad2.png" alt="Ad 2" className="adImage"/>
        </div>

        {/* إحصائيات المستخدم */}
        <div className="userStats">
          <span>Posts: 45</span>
          <span>Likes: 320</span>
        </div>

        {/* الأصدقاء المتصلين */}
        <h4 className="rightbarTitle">Online Friends</h4>
        {/* Online friends can be added here later */}
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div className="profileRightbar">
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="assets/person/1.jpeg" alt="Friend" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          {/* Add more friends here */}
        </div>
      </div>
    );
  };

  const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-profile">
          <img src="https://via.placeholder.com/50" alt="Profile" className="profile-pic" />
          <h3>Alaa Maged</h3>
          <p>@alaa-maged</p>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Mail /> الرئيسية
          </li>
          <li className="sidebar-list-item">
            <Person /> الملف الشخصي
          </li>
          <li className="sidebar-list-item">
            <Settings /> الإعدادات
          </li>
          <li className="sidebar-list-item">
            <EventNote /> الذكريات
          </li>
          <li className="sidebar-list-item">
            <Bookmark /> المحفوظات
          </li>
        </ul>

        {/* Invitation Section */}
        <div className="sidebar-invite">
          <input type="text" value="رابط الدعوة الخاصة بك" readOnly />
          <button>مشاركة الدعوة الخاصة بك</button>
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="sidebarWrapper">
        <Sidebar />
        <div className="rightbarWrapper">
          {profile ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </div>
  );
}

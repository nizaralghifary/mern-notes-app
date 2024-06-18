import React from 'react';
import { getInitials } from '../../utils/helper.js';

const ProfileInfo = ({userInfo, onLogout}) => {
  console.log("User Info:", userInfo);
  
  if (!userInfo) {
    return <p className="text-sm"></p>;
  }
  
  return ( 
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo.fullName)}
      </div>
      
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">{userInfo.fullName}</p>
        <button className="text-sm text-slate-700 underline hover:text-primary" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
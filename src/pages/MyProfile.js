import React from "react";

function MyProfile(props) {
  return (
    <div>
      <h1 className="display-4">My Profile</h1>
      <h4><strong>Hello {props.username}!</strong></h4>
      {props.email !== null && <h4><strong>Email: {props.email}</strong></h4>}
      {props.password !== null && <h4><strong>Password: {props.password}</strong></h4>}
    </div>
  );
}

export default MyProfile;

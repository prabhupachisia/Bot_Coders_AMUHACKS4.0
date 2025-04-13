import React from "react";
function UserDocCon() {
  return (
    <div className="container mt-5">
      <h2 className="text-center">User Doctor Consultation</h2>
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Doctor Name</h5>
              <p className="card-text">Doctor Specialization</p>
              <p className="card-text">Date: 2023-10-01</p>
              <p className="card-text">Time: 10:00 AM</p>
              <a href="#" className="btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDocCon;
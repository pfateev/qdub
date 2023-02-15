import React from "react";
import "./TAModal.css";

const TAModal = props => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Hi TA!</h4>
        </div>
        <div className="modal-body">
          Are you...?
        </div>
        <div className="modal-footer">
          <button className="button">Close</button>
        </div>
      </div>
    </div>
  )
}

export default TAModal
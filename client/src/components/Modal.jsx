import React from "react";
import "./Modal.css";

const Modal = props => {
  return(
    <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="cancelButt">Close</button>
          <button onClick={props.onConfirm} className="submitButt">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;
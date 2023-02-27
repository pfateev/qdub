import React from "react";
import "./Modal.css";
import "./GeneralStyle.css"

const Modal = props => {
  return(
    <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">{props.title}</h1>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          {props.isLogin &&
          <>
            <button onClick={props.onConfirmTa} className="submit" id="ta">TA</button>
            <button onClick={props.onConfirmStudent} className="submit"id="student">Student</button>
            <button onClick={props.onClose} className="cancel">&times;</button>
          </>
          }
          {props.isQueue &&
          <>
            <button onClick={props.onStepIn} className="submit" id="stepIn">Step in!</button>
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal;
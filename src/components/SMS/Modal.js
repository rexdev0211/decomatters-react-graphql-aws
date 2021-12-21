import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './app.css'
const ModalCustom = ({ isShowing, hide, children, completeHide, noCloseButton, hideMobile }) => {
  const ref = new useRef()

  useEffect(() => {
    //completed from modal child
    if (completeHide === true) hideAnimation()
  }, [completeHide])

  const hideAnimation = () => {
    ref.current.style.opacity = 0
    setTimeout(() => hide(), 500)
  }

  const getModalClass = () => {
    return hideMobile ? 'modal-overlay hideModal' : 'modal-overlay'
  }

  const getModalWrapperClass = () => {
    return hideMobile ? 'modal-wrapper hideModal' : 'modal-wrapper'
  }

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={getModalClass()} />
          <div
            className={getModalWrapperClass()}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal" ref={ref}>
              <div className="modal-header">
                {noCloseButton !== 1 ? (
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hideAnimation}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                ) : (
                  <div aria-hidden="true">&nbsp;</div>
                )}
              </div>
              <div>{children}</div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null
}

export default ModalCustom

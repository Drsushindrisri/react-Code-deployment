import React, { useEffect } from "react";
import ReactModal from "react-modal";

export const SuccessAlert = ({ modalOpen, toggleModal }) => {
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        toggleModal();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  return (
    <ReactModal isOpen={modalOpen}>
      <p className="modal-title">Successfully Booked</p>
      <SuccessSvg />
    </ReactModal>
  );
};

const SuccessSvg = () => (
  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path
      class="checkmark__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
);

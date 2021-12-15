import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { Spinner } from "./Spinner";

export const SuccessAlert = ({
  modalOpen,
  toggleModal,
  text,
  svg,
  loading,
}) => {
  useEffect(() => {
    if (modalOpen && !loading) {
      setTimeout(() => {
        toggleModal();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, loading]);

  return (
    <ReactModal isOpen={modalOpen}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="modal-title">{text}</p>
          {svg}
        </>
      )}
    </ReactModal>
  );
};

import Modal from 'react-modal';
import { FaTimes } from "react-icons/fa";

import "./wizard.scss";

const Wizard = ({ isOpen, closeWizard, children, headline }) => {

  function afterOpenModal() {
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeWizard}
      contentLabel="Wizard"
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <div className="header">
        <div className="headline">{headline}</div>
        <div className="iconbox">
          <button onClick={closeWizard}>
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="wizardContent">
        {children}
      </div>
    </Modal>
  );
};

export default Wizard;
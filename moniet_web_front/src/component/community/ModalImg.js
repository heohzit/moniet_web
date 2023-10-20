import "./community.css";

const ModalImg = (props) => {
  const modal = props.modal;
  const setModal = props.setModal;
  const modalImg = props.modalImg;

  console.log(modalImg);

  const closeImg = (e) => {
    setModal(!modal);
    e.stopPropagation();
  };

  return (
    <div className="modal-img-wrap" onClick={closeImg}>
      <div className="modal-img">
        <img src={modalImg} />
      </div>
    </div>
  );
};

export default ModalImg;

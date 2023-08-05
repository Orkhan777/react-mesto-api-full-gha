function ImagePopup(props) {
  const { card, onClose } = props;

  const popupClass = card._id
    ? "popup img-popup popup_opened"
    : "popup img-popup";

  return (
    <div className={popupClass}>
      <div className="popup__card">
        <div className="popup__user-info">
          <img className="popup__photo" src={card.link} alt={card.name} />
          <button
            className="popup__close-button"
            id="close-photo-card"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__photo-title">{card.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;

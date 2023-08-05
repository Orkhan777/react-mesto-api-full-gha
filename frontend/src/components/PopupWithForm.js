function PopupWithForm(props) {
  const { name, title, btnText, children, isOpen, onClose, onSubmit } = props;

  const popupClass = isOpen ? ("popup popup_opened") : ("popup");

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          method="post"
          className={`popup__form popup__${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save-button" type="submit">
            {btnText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
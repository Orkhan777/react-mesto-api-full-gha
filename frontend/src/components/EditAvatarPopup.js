import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  // очистка поля ввода при закрытии окна
  React.useEffect(() => {
    if (!isOpen) {
      ref.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-section">
        <input
          className="popup__input"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          ref={ref}
        />
        <span className="avatar-error popup__span-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
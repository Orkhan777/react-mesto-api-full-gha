import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-section">
        <input
          className="popup__input"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name !== null && name !== undefined ? name : ""}
          onChange={handleNameChange}
        />
        <span className="name-error popup__span-error" />
      </div>
      <div className="popup__form-section">
        <input
          className="popup__input"
          type="text"
          name="about"
          id="profession"
          placeholder="Ваша профессия"
          required
          minLength="2"
          maxLength="200"
          value={
            description !== null && description !== undefined ? description : ""
          }
          onChange={handleDescriptionChange}
        />
        <span className="profession-error popup__span-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
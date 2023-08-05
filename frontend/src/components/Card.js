function Card(props) {
  const { card, onCardClick, currentUser, onCardLike, onCardDelete } = props;

  function handleCardClick() {
    onCardClick(card);
  }

  const isOwner = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `card__button-like ${isLiked && "card__button-like_active"}`);

  const cardDeleteButtonClassName = (
    `button-remove ${isOwner && "button-remove_show"}`);

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <div
        className="card__image"
        id="card__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleCardClick}
      ></div>
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__info-like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          />
          <span className="card__like-score">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      />
    </article>
  );
}

export default Card;

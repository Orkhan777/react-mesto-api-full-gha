import iconFalse from '../images/icon-false.svg'
import iconTrue from '../images/icon-true.svg'

function InfoTooltip(props) {
  const {isOpen, onClose, res, text} = props;

  const popupClass = isOpen ? ("popup popup_opened") : ("popup");

  return (
    <div className={popupClass}>
        <div className='popup__container'>
            <div className='popup__icon' style={{backgroundImage: `url(${res ? iconTrue : iconFalse})` }} />
            <p className='popup__content'>{text}</p>
            <button type='button' aria-label="Закрыть" className='popup__close-button' onClick={onClose} />
        </div>
    </div>
  )
}

export default InfoTooltip;
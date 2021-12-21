import styles from './mc.module.css'
import { ReactComponent as Close } from '../../assets/close.svg'

const CloseButton = ({ onClose }) => {
  return (
    <button className={styles.clb} onClick={onClose}>
      <Close className={styles.cli} />
    </button>
  )
}

export default CloseButton

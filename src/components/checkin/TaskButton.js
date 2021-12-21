import { ReactComponent as Coin } from '../../assets/coin.svg'
import { ReactComponent as Check } from '../../assets/checkmark.svg'
import styles from './cb.module.css'

const classForStatus = status => {
  switch (status) {
    case 'claimed':
      return styles.claimButtonClaimed
    case 'claimable':
      return styles.claimButtonClaimable
    case 'open':
      return styles.claimButton
    default:
      return styles.claimButton
  }
}

const TaskButton = ({ onClick, coinReward, disabled, status }) => (
  <button className={classForStatus(status)} onClick={onClick} disabled={disabled}>
    {status === 'claimed' ? (
      <>
        Claimed <Check />
      </>
    ) : (
      <>
        <Coin style={{ height: 18, width: 18, position: 'absolute', top: 9, left: 9 }} />
        &nbsp;&nbsp; {status === 'claimable' ? 'Claim' : 'Earn'} {coinReward}
      </>
    )}
  </button>
)

export default TaskButton

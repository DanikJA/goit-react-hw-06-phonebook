import { useSelector } from 'react-redux';

export const Account = () => {
  const balance = useSelector(state => state.account.balance);
  return (
    <div>
      <p>
        <b>Balance:{balance} credits</b>
      </p>
      <button>Deposit</button>
      <button>Withdraw</button>
    </div>
  );
};

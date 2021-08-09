import { useEffect } from 'react';
import { useAllTransactions, useTransactionError } from 'state/hooks';
import { SuccessNotification, ErrorNotification } from './Notification';

export const NotificationWrapper = () => {
  const tx = useAllTransactions();
  const [txError, setTxError] = useTransactionError();

  useEffect(() => {
    // Clear tx error after 5s
    const id = setTimeout(() => {
      setTxError('');
    }, 5000);

    return () => clearTimeout(id);
  }, [txError]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {tx.length > 0 && <SuccessNotification />}
          {txError.length > 0 && <ErrorNotification message={txError} />}
        </div>
      </div>
    </>
  );
};

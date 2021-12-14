/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
// import { CheckIcon } from '@heroicons/react/outline';
// import { useAuth } from '../src/context/AuthContext';
import Input from './Input';
import SelectInput from './SelectInput';
import { addTransaction } from '../actions/transactionActions';
import InfoModal from './InfoModal';
import TransactAlertSuccess from './TransactAlertSuccess';
import { CREATE_TRANSACTION_RESET } from '../constants/transactionConstants';

const coins = [
  { type: 'Doge', symbol: 'DOGE' },
  { type: 'Tron', symbol: 'TRX' },
  { type: 'Algo', symbol: 'ALGO' },
];

export default function TransactionModal({ modal, history, location, symbol }) {
  console.log(symbol);
  const [open, setOpen] = useState(true);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [selected, setSelected] = useState(symbol);
  const [infoModal, setInfoModal] = useState(false);
  const [transactAlert, setTransactAlert] = useState(false);

  console.log(selected);
  console.log(symbol);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createTransaction = useSelector((state) => state.createTransaction);

  const { loading, success, error } = createTransaction;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (success) {
      setTransactAlert(true);
      window.setTimeout(() => {
        setOpen(false);
        setTransactAlert(false);
        dispatch({
          type: CREATE_TRANSACTION_RESET,
        });
        setInfoModal(true);
      }, 5000);
    }
  }, [dispatch, history, success, userInfo]);

  // const [open, setOpen] = useState(true);
  // const email = "josadegboye@gmail.com",
  //   password = "secret";

  // useEffect(() => {
  //   auth.register({ email, password });
  // }, [auth, email, password]);

  // const register = () => {
  //   return auth.register({ email, password });
  // };

  console.log({ loading, success, error });

  const onClickHandler = (e) => {
    e.preventDefault();
    console.log({
      amount,
      coinType: selected.type,
      coinSymbol: selected.symbol,
      address,
    });
    dispatch(
      addTransaction({
        amount,
        coinType: selected.type,
        coinSymbol: selected.symbol,
        address,
      })
    );
  };

  // const { auth } = useAuth();
  // console.log(auth);

  // console.log(modal);

  return (
    <>
      {infoModal && (
        <InfoModal coinType={selected.type} amount={amount} history={history} />
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6'>
                <div>
                  <div className=' bg-gray-50 flex flex-col justify-center py-2 sm:px-6 lg:px-4'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Make your transaction
                      </h2>
                    </div>

                    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                      <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                        <form
                          onSubmit={onClickHandler}
                          className='space-y-6'
                          action='#'
                          method='POST'
                        >
                          {/* <Input
                          labelName={'Coin Type'}
                          name={'coin'}
                          type={''}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        /> */}

                          <SelectInput
                            selected={selected}
                            setSelected={setSelected}
                            coins={coins}
                          />

                          <Input
                            labelName={'Amount'}
                            name={'amount'}
                            type={'text'}
                            value={amount}
                            placeholder={0}
                            onChange={(e) => setAmount(e.target.value)}
                          />

                          <Input
                            labelName={`Enter ${selected.type} address`}
                            name={'address'}
                            type={'text'}
                            value={address}
                            placeholder={`${selected.type} address`}
                            onChange={(e) => setAddress(e.target.value)}
                          />

                          <div>
                            <button
                              type='submit'
                              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                              {loading ? 'Loading...' : 'Transact'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {transactAlert && <TransactAlertSuccess />}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

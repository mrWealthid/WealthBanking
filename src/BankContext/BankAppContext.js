import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
} from 'react';
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  deleteUser,
  getAuth,
} from 'firebase/auth';
import { generateAccNums, createUserStore } from '../components/Utils';

const BankAppContext = createContext();

const BankAppProvider = ({ children }) => {
  const [register, setRegister] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [accounts, setAccounts] = useState([]);

  // const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  const [userDetails, setUserDetails] = useState({});

  // const [resetEmail, setResetEmail] = useState('');
  // const [confirmFields, setConfirmFields] = useState(true);

  // const [buttonLoader, setButtonLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);

  const history = useHistory();

  const transferAmount = useRef();
  const transferNum = useRef();
  const loanRef = useRef();
  const closeUser = useRef();
  const closeUserPin = useRef();

  const data = 'wealth';

  const collectionRef = collection(db, 'Accounts');

  //To order by timestamp
  useEffect(() => {
    const q = query(collection(db, 'Accounts'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  }, []);

  //get all documents in a collection

  useEffect(() => {
    onSnapshot(collection(db, 'Accounts'), (snapshot) => {
      setAccounts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  // get currrent logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);
    });

    return unsubscribe;
  }, []);

  //Get current signed in  user's firestore
  useEffect(() => {
    if (users) {
      setUserDetails(accounts.find((item) => item.id === users.uid));
    }
  }, [accounts, users]);

  useEffect(() => {
    setTotal(
      userDetails?.transactions
        ?.map((mov) => Number(mov.amount))
        .reduce((arr, mov) => arr + mov, 0)
    );
  }, [userDetails]);

  useEffect(() => {
    setDeposit(
      userDetails?.transactions
        ?.map((mov) => Number(mov.amount))
        .filter((mov) => mov > 0)
        .reduce((arr, mov) => arr + mov, 0)
    );
  }, [userDetails]);

  useEffect(() => {
    setWithdrawal(
      Math.abs(
        userDetails?.transactions
          ?.map((mov) => Number(mov.amount))
          .filter((mov) => mov < 0)
          .reduce((arr, mov) => arr + mov, 0)
      )
    );
  }, [userDetails]);

  //Login
  // useEffect(() => {
  //   if (login.email !== '' && login.password !== '') {
  //     setConfirmFields(false);
  //   } else {
  //     setConfirmFields(true);
  //   }
  // }, [login.email, login.password]);

  //Register
  // useEffect(() => {
  //   if (register.email !== '' && register.password !== '') {
  //     setConfirmFields(false);
  //   } else {
  //     setConfirmFields(true);
  //   }
  // }, [register.email, register.password]);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );

      const { uid } = data.user;

      const docRef = doc(collectionRef, uid);
      const payload = {
        name: register.firstname + ' ' + register.lastname,
        id: uid,
        transactions: [
          {
            Depositor: 'WealthBank',
            account: 'Bonus',
            time: new Date().toISOString(),
            amount: 1000,
          },
        ],
        timestamp: serverTimestamp(),
        accountNumber: generateAccNums(),
      };

      await setDoc(docRef, payload);

      history.push('/creating');

      const myStore = await createUserStore(uid);
      setUserDetails(myStore.data());

      setRegister({
        email: '',
        password: '',
      });

      setTimeout(() => {
        history.push('/profile');
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      );

      console.log(data.user.uid);

      // setButtonLoader(true);

      history.push('/loginState');

      const myStore = await createUserStore(data.user.uid);
      setUserDetails(myStore.data());

      setLogin({
        email: '',
        password: '',
      });

      setTimeout(() => {
        // setButtonLoader(false);
        history.push('/profile');
      }, 1500);
    } catch (error) {
      console.log(error.message);
      // setAlert({
      //   type: true,
      //   msg: 'Failed To Login Try Again!!',
      // });
      // setButtonLoader(true);

      // setTimeout(() => {
      //   setButtonLoader(false);
      // }, 3000);
    }
  };

  const handleLogout = async () => {
    history.push('/Logout');

    setTimeout(() => {
      signOut(auth);
      history.push('/login');
    }, 3000);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleTransfers = async (e) => {
    e.preventDefault();
    const findAccount = accounts.find(
      (acc) => acc.accountNumber === Number(transferNum.current.value)
    );

    if (
      findAccount &&
      findAccount.accountNumber !== userDetails.accountNumber &&
      Number(transferAmount.current.value) < total
    ) {
      const recieverRef = doc(db, 'Accounts', findAccount.id);

      const transferRef = doc(db, 'Accounts', users.uid);

      //updating an array in a document field

      const recieverPayload = [
        ...findAccount.transactions,
        {
          Depositor: userDetails.name,
          account: userDetails.accountNumber,
          time: new Date().toISOString(),
          amount: Number(transferAmount.current.value),
        },
      ];

      const depositorPayload = [
        ...userDetails.transactions,
        {
          Depositor: findAccount.name,
          account: findAccount.accountNumber,
          time: new Date().toISOString(),
          amount: -transferAmount.current.value,
        },
      ];

      await updateDoc(recieverRef, {
        transactions: recieverPayload,
      });

      await updateDoc(transferRef, {
        transactions: depositorPayload,
      });

      transferNum.current.value = '';
      transferAmount.current.value = '';
    }
  };

  const handleLoans = async (e) => {
    e.preventDefault();

    if (deposit > 0.5 * total) {
      const loanReference = doc(db, 'Accounts', users.uid);

      //updating an array in a document field

      const loanPayload = [
        ...userDetails.transactions,
        {
          Depositor: 'WealthBank',
          account: 'Management',
          time: new Date().toISOString(),
          amount: Number(loanRef.current.value),
        },
      ];

      await updateDoc(loanReference, {
        transactions: loanPayload,
      });

      loanRef.current.value = '';
    }
  };

  const handleCloseAccount = async (e) => {
    e.preventDefault();

    try {
      if (
        userDetails.accountNumber === Number(closeUser.current.value) &&
        closeUserPin.current.value === users.email
      ) {
        await deleteDoc(doc(collectionRef, users.uid));

        users.delete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BankAppContext.Provider
      value={{
        data,
        handleLogin,
        handleSignup,
        register,
        ...login,
        users,
        handleChangeLogin,
        handleChangeRegister,
        handleModal,
        isOpen,
        handleLogout,
        userDetails,
        total,
        accounts,
        transferAmount,
        transferNum,
        handleTransfers,
        deposit,
        withdrawal,
        loanRef,
        closeUser,
        closeUserPin,
        handleLoans,
        handleCloseAccount,
      }}
    >
      {children}
    </BankAppContext.Provider>
  );
};

const useBankContext = () => {
  return useContext(BankAppContext);
};

export { useBankContext, BankAppProvider };

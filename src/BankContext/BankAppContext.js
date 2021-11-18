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
} from 'firebase/auth';
import {
  generateAccNums,
  createUserStore,
  convertTime,
  formatDate,
  formatCurrency,
  calcLoanPayBackTime,
} from '../components/Utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoggedIn,
  isLoggedOut,
  getDebits,
  getCredits,
  getAll,
  getAccounts,
  sortByDesc,
  sortByAsc,
  getTotalCredit,
  getTotalDebit,
  getBalance,
} from '../actions';

const BankAppContext = createContext();

const BankAppProvider = ({ children }) => {
  const dispatch = useDispatch();
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

  // const [accounts, setAccounts] = useState([]);

  // const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState({});
  const [userDetails, setUserDetails] = useState({});

  // const [usersData, setUsersData] = useState({});

  // const [resetEmail, setResetEmail] = useState('');
  const [confirmFields, setConfirmFields] = useState(true);

  const [alert, setAlert] = useState({
    type: false,
    msg: '',
  });

  const [transferError, setTransferError] = useState({
    type: true,
    msg: '',
  });

  const [transVal, setTransVal] = useState('');
  const [loanAlert, setLoanAlert] = useState({
    type: true,
    msg: '',
  });

  const [closeAlert, setCloseAlert] = useState({
    type: true,
    msg: '',
  });

  const [popUp, setpopUp] = useState(false);

  const [selected, setSelected] = useState({
    type: 1,
  });

  const [buttonLoader, setButtonLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [total, setTotal] = useState(0);
  // const [deposit, setDeposit] = useState(0);
  // const [withdrawal, setWithdrawal] = useState(0);
  const [asc, setAsc] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const history = useHistory();

  const transferAmount = useRef();

  const loanRef = useRef();
  const closeUser = useRef();
  const closeUserPin = useRef();

  const data = 'wealth';

  const collectionRef = collection(db, 'Accounts');

  //clearAlert

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ ...alert, type: false });
      setCloseAlert({ ...closeAlert, type: false });
      setLoanAlert({ ...loanAlert, type: false });
      setTransferError({ ...transferError, type: false });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert, closeAlert, transferError, loanAlert]);

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
      dispatch(
        getAccounts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    });
  }, [dispatch]);

  // get currrent logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // setUsers(currentUser);
      currentUser ? dispatch(isLoggedIn(currentUser)) : dispatch(isLoggedOut());
    });

    return unsubscribe;
  }, [dispatch]);

  //pulling from redux store
  const authenticated = useSelector((state) => state.Authentication);

  const userData = useSelector((state) => state.userData.data);

  const deposit = useSelector((state) => state.userData.totalCredits);
  const withdrawal = useSelector((state) => state.userData.totalDebits);
  const total = useSelector((state) => state.userData.total);

  const accounts = useSelector((state) => state.Accounts);

  //Get current signed in  user's firestore
  useEffect(() => {
    if (authenticated) {
      setUserDetails(accounts.find((item) => item.id === authenticated.uid));
    }
  }, [accounts, authenticated]);

  useEffect(() => {
    dispatch(
      getBalance(
        userDetails?.transactions
          ?.map((mov) => Number(mov.amount))
          .reduce((arr, mov) => arr + mov, 0)
      )
    );
  }, [dispatch, userDetails]);

  useEffect(() => {
    dispatch(
      getTotalCredit(
        userDetails?.transactions
          ?.map((mov) => Number(mov.amount))
          .filter((mov) => mov > 0)
          .reduce((arr, mov) => arr + mov, 0)
      )
    );
  }, [dispatch, userDetails]);

  useEffect(() => {
    dispatch(
      getTotalDebit(
        Math.abs(
          userDetails?.transactions
            ?.map((mov) => Number(mov.amount))
            .filter((mov) => mov < 0)
            .reduce((arr, mov) => arr + mov, 0)
        )
      )
    );
  }, [dispatch, userDetails]);

  useEffect(() => {
    if (Number(selected.type) === 2) {
      dispatch(
        getDebits({
          ...userDetails,
          transactions: userDetails?.transactions?.filter(
            (item) => item.amount < 0
          ),
        })
      );
    }
  }, [selected.type, userDetails, dispatch]);

  useEffect(() => {
    if (Number(selected.type) === 3) {
      dispatch(
        getCredits({
          ...userDetails,
          transactions: userDetails?.transactions?.filter(
            (item) => item.amount > 0
          ),
        })
      );
    }
  }, [selected.type, userDetails, dispatch]);

  useEffect(() => {
    if (Number(selected.type) === 1) {
      dispatch(getAll({ ...userDetails }));
    }
  }, [userDetails, selected.type, dispatch]);

  //Login
  useEffect(() => {
    if (login.email !== '' && login.password !== '') {
      setConfirmFields(false);
    } else {
      setConfirmFields(true);
    }
  }, [login.email, login.password]);

  const errorChecker = ({ code }) => {
    if (code === 'auth/email-already-in-use') {
      setAlert({ type: true, msg: 'Email Already In Use' });
    } else if (code === 'auth/network-request-failed') {
      setAlert({ type: true, msg: 'Please Check Your Network Connection...' });
    } else if (code === 'auth/weak-password') {
      setAlert({
        type: true,
        msg: 'Password should be at least 6 characters',
      });
    } else if (code === 'auth/wrong-password') {
      setAlert({
        type: true,
        msg: 'Wrong Credentials',
      });
    } else if (code === 'auth/user-not-found') {
      setAlert({
        type: true,
        msg: "Account doesn't exist ",
      });
    }
  };
  // Register;
  useEffect(() => {
    if (
      register.email !== '' &&
      register.password !== '' &&
      register.firstname !== '' &&
      register.lastname
    ) {
      setConfirmFields(false);
    } else {
      setConfirmFields(true);
    }
  }, [
    register.email,
    register.firstname,
    register.lastname,
    register.password,
  ]);

  const selectChange = (e) => {
    setSelected({ ...selected, type: e.target.value });
  };

  const capitalize = (vals) => {
    if (vals) {
      return vals.split('')[0].toUpperCase() + vals.slice(1);
    } else {
      return vals;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );

      const { uid, email } = data.user;

      // dispatch(
      //   logIn({
      //     ...data,
      //   })
      // );

      const docRef = doc(collectionRef, uid);
      const payload = {
        name:
          capitalize(register.firstname) + ' ' + capitalize(register.lastname),
        id: uid,
        email: email,
        transactions: [
          {
            Depositor: 'WealthBank',
            account: 'Bonus',
            time: new Date().toISOString(),
            amount: 1000,
          },
        ],
        timestamp: serverTimestamp(),
        accountNumber: generateAccNums(11111, 99999),
      };

      await setDoc(docRef, payload);

      history.push('/creating');

      const myStore = await createUserStore(uid);
      setUserDetails(myStore.data());

      setRegister({
        email: '',
        password: '',
      });

      setConfirmFields(true);

      setTimeout(() => {
        history.push('/profile');
      }, 4000);
    } catch (error) {
      errorChecker(error);
      console.log(error);
      setConfirmFields(false);
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
      await signInWithEmailAndPassword(auth, login.email, login.password);

      // console.log(data.user.uid);

      // dispatch(
      //   logIn({
      //     email: data.user.email,
      //     uid: data.user.uid,
      //     displayName: data.user.displayName,
      //     photoUrl: data.user.photoURL,
      //   })
      // );

      setButtonLoader(true);

      setLogin({
        email: '',
        password: '',
      });

      setConfirmFields(true);
      setTimeout(() => {
        setButtonLoader(false);
        history.push('/profile');
      }, 1500);
    } catch (error) {
      console.log(error.message);
      errorChecker(error);
      setConfirmFields(false);

      setButtonLoader(true);

      setTimeout(() => {
        setButtonLoader(false);
      }, 3000);
    }
  };

  const handleLogout = async () => {
    history.push('/Logout');

    setTimeout(() => {
      dispatch(isLoggedOut());
      signOut(auth);
      setUserDetails({});
      history.push('/login');
    }, 3000);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const transferCheck = (find, user, transfer, total) => {
    if (find === undefined) {
      return "User doesn't exist";
    }
    if (find.accountNumber === user.accountNumber) {
      return "You can't transfer to self";
    } else if (Number(transfer.current.value) > total) {
      return 'Insufficient Balance';
    } else {
      return 'Check Network Connection';
    }
  };

  const handleTransfers = async (e) => {
    e.preventDefault();
    const findAccount = accounts.find(
      (acc) => acc.accountNumber === Number(transVal)
    );

    if (
      findAccount &&
      findAccount.accountNumber !== userDetails.accountNumber &&
      Number(transferAmount.current.value) < total
    ) {
      const recieverRef = doc(db, 'Accounts', findAccount.id);

      const transferRef = doc(db, 'Accounts', authenticated.uid);

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
      setTransVal('');
      transferAmount.current.value = '';
      setSuccessMsg(true);
      setTimeout(() => {
        setpopUp(false);
      }, 3000);
    } else {
      setTransferError({
        type: true,
        msg: transferCheck(findAccount, userDetails, transferAmount, total),
      });
    }
  };

  const handleLoans = async (e) => {
    e.preventDefault();

    if (deposit > 0.5 * total && Number(loanRef.current.value) < total * 2) {
      const loanReference = doc(db, 'Accounts', authenticated.uid);

      //updating an array in a document field

      const loanPayload = [
        ...userDetails.transactions,
        {
          Depositor: 'WealthBank',
          account: 'Loan',
          type: 'Loan',
          time: new Date().toISOString(),
          amount: Number(loanRef.current.value),
          dueTime: calcLoanPayBackTime(7, new Date().toISOString()),
        },
      ];

      await updateDoc(loanReference, {
        transactions: loanPayload,
      });
      loanRef.current.value = '';
      setSuccessMsg(true);

      setTimeout(() => {
        setpopUp(false);
      }, 3000);
    } else {
      setLoanAlert({
        type: true,
        msg:
          Number(loanRef.current.value) >= total * 2
            ? "You aren't qualified for this Loan"
            : 'Check Network Connection',
      });
    }
  };

  const handleCloseAccount = async (e) => {
    e.preventDefault();

    try {
      if (
        userDetails.accountNumber === Number(transVal) &&
        closeUserPin.current.value === authenticated.email
      ) {
        setTransVal('');
        closeUserPin.current.value = '';
        setpopUp(false);
        await authenticated.delete();
        await deleteDoc(doc(collectionRef, authenticated.uid));

        // users.delete();
      } else {
        setCloseAlert({
          type: true,
          msg:
            userDetails.accountNumber !== Number(transVal) &&
            closeUserPin.current.value !== authenticated.email
              ? 'Wrong Credentials'
              : 'Check Network connection',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortDesc = () => {
    dispatch(
      sortByDesc({
        ...userData,
        transactions: userData.transactions.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        ),
      })
    );
    setAsc(!asc);
  };

  const handleSortAsc = () => {
    dispatch(
      sortByAsc({
        ...userData,
        transactions: userData.transactions.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        ),
      })
    );
    setAsc(!asc);
  };

  return (
    <BankAppContext.Provider
      value={{
        data,
        handleLogin,
        handleSignup,
        register,
        ...login,
        ...alert,
        popUp,
        setpopUp,
        handleChangeLogin,
        handleChangeRegister,
        handleModal,
        isOpen,
        handleLogout,
        userDetails,
        total,
        accounts,
        transferAmount,
        transVal,
        handleTransfers,
        deposit,
        withdrawal,
        loanRef,
        closeUser,
        closeUserPin,
        handleLoans,
        handleCloseAccount,
        confirmFields,
        transferError,
        loanAlert,
        closeAlert,
        authenticated,
        setTransVal,
        selected,
        selectChange,
        userData,
        handleSortAsc,
        handleSortDesc,
        asc,
        successMsg,
        setSuccessMsg,
        capitalize,
        buttonLoader,
        convertTime,
        formatDate,
        formatCurrency,
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

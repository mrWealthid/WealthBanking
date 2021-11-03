import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  orderBy,
  query,
  getDoc,
  serverTimestamp,
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
  CheckAccNums,
  createUserStore,
} from '../components/Utils';

const BankAppContext = createContext();

const BankAppProvider = ({ children }) => {
  const [register, setRegister] = useState({
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

  const [buttonLoader, setButtonLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const history = useHistory();

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
        name: 'Wealth',
        id: uid,
        transactions: [{ Depositor: 'Wealthy', amount: 1000 }],
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

      setButtonLoader(true);

      history.push('/loginState');

      const myStore = await createUserStore(data.user.uid);
      setUserDetails(myStore.data());

      setLogin({
        email: '',
        password: '',
      });

      setTimeout(() => {
        setButtonLoader(false);
        history.push('/profile');
      }, 1500);
    } catch (error) {
      console.log(error.message);
      // setAlert({
      //   type: true,
      //   msg: 'Failed To Login Try Again!!',
      // });
      setButtonLoader(true);

      setTimeout(() => {
        setButtonLoader(false);
      }, 3000);
    }
  };

  const handleLogout = () => {
    history.push('/Logout');

    setTimeout(() => {
      signOut(auth);
      history.push('/login');
    }, 3000);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
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

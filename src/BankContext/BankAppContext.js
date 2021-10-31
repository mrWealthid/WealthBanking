import React, { useContext, useState, useEffect, createContext } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { generateAccNums, CheckAccNums } from '../components/Utils';

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
  const [users, setUsers] = useState({});

  const [resetEmail, setResetEmail] = useState('');
  const [confirmFields, setConfirmFields] = useState(true);

  const [buttonLoader, setButtonLoader] = useState(false);

  const history = useHistory();

  const data = 'wealth';

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, register.email, register.password)
      .then((data) => data.user.uid)
      .then((uid) => {
        const docRef = doc(db, 'Accounts', uid);
        const payload = {
          name: 'Wealth',
          id: uid,
          transactions: [],
          accountNumber: generateAccNums(),
        };
        setDoc(docRef, payload);

        history.push('/profile');
        setRegister({
          email: '',
          password: '',
        });
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = () => {
    console.log('Logged In');
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <BankAppContext.Provider
      value={{
        data,
        handleLogin,
        handleSignup,
        register,
        ...login,
        handleChangeLogin,
        handleChangeRegister,
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

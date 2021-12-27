import { getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
const collectionRef = collection(db, 'Accounts');

//Generate Account Number
// export function generateAccNums() {
//   return Math.floor(Math.random() * 10e4);
// }

export const generateAccNums = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};

//Check if account num exsit
export function CheckAccNums(acc, num) {
  return acc.includes(num) ? CheckAccNums(acc, generateAccNums()) : num;
}

//get the document for each user using id
export async function getUserByID(userid) {
  const docRef = doc(collectionRef, userid);

  const userRef = await getDoc(docRef);

  return userRef;
}

// export function convertTime(times) {
//   const currentDate = new Date(times).toTimeString();
//   return currentDate.slice(0, 5);
// }

export const convertTime = (time) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const locale = navigator.language;

  return Intl.DateTimeFormat(locale, options).format(new Date(time));
};

//to get days passed
export const calcDaysPassed = (date1, date2) =>
  Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

//to get hours passed
export const calcHoursPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60));

//to get mins passed
export const calcMinsPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60));

// console.log(calcDaysPassed(new Date(2021, 11, 14), new Date(2021, 11, 12)));

export const formatDate = (date) => {
  const daysPassed = calcDaysPassed(new Date(), new Date(date));

  const WeeksPassed = Math.round(
    calcDaysPassed(new Date(), new Date(date)) / 7
  );
  const locale = navigator.language;
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  if (WeeksPassed === 1) return `${WeeksPassed} week ago`;
  if (WeeksPassed > 1) return `${WeeksPassed} weeks ago`;
  const TodaysDate = new Intl.DateTimeFormat(locale).format(new Date(date));
  return TodaysDate;
};

export const formatCurrency = (locale, currency = 'NGN', value) => {
  const options = {
    style: 'currency',
    currency,
  };

  return new Intl.NumberFormat(locale, options).format(Math.abs(value));
};

//getNumber of days from current date

// const getDueDate = (days) => {
//   const date = new Date();
//   date.setDate(date.getDate() + days);

export const calcLoanPayBackTime = (days, loanDate) => {
  const date = new Date();
  const getDueDate = date.setDate(date.getDate() + days);

  const minutesLeft = calcMinsPassed(new Date(loanDate), new Date(getDueDate));
  return minutesLeft;
};

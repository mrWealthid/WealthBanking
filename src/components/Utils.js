import { getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
const collectionRef = collection(db, 'Accounts');

//Generate Account Number
export function generateAccNums() {
  return Math.floor(Math.random() * 10e4);
}

//Check if account num exsit
export function CheckAccNums(acc, num) {
  return acc.includes(num) ? CheckAccNums(acc, generateAccNums()) : num;
}

//create a store for each user
export async function createUserStore(userid) {
  const docRef = doc(collectionRef, userid);

  const userRef = await getDoc(docRef);

  return userRef;
}

export function convertTime(times) {
  const currentDate = new Date(times).toTimeString();
  return currentDate.slice(0, 5);
}

export const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

// console.log(calcDaysPassed(new Date(2021, 11, 14), new Date(2021, 11, 12)));

export const formatDate = (date) => {
  const daysPassed = calcDaysPassed(new Date(), new Date(date));
  const locale = navigator.language;

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const TodaysDate = new Intl.DateTimeFormat(locale).format(date);
    return TodaysDate;
  }
};

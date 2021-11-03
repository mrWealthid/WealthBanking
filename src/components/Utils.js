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

// src/utils/saveReport.js
import { getFirestore, doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveMarriageReportToFirestore(userId, formData, result) {
  const reportsRef = collection(db, "users", userId, "marriageReports");
  const reportId = Date.now().toString();

  const data = {
    ...formData,
    predicted_age: result.age,
    zodiac_sign: result.zodiac_sign || null,
    explanation: result.explanation || null,
    created_at: serverTimestamp(),
  };

  await setDoc(doc(reportsRef, reportId), data);
}


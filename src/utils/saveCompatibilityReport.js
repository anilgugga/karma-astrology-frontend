import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveCompatibilityReport(result, person1, person2) {
  try {
    const userId =
      localStorage.getItem("user_id") ||
      (() => {
        const id = crypto.randomUUID();
        localStorage.setItem("user_id", id);
        return id;
      })();

    const docRef = await addDoc(
      collection(db, "users", userId, "compatibilityReports"),
      {
        person1,
        person2,
        result,
        created_at: serverTimestamp(),
      }
    );

    console.log("Compatibility report saved:", docRef.id);
  } catch (error) {
    console.error("Error saving compatibility report:", error);
  }
}

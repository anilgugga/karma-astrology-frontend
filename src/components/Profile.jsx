import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Profile = () => {
  const [transitDashaReports, setTransitDashaReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const user = auth.currentUser;
      if (user) {
        const ref = collection(db, `users/${user.uid}/transitDashaReports`);
        const snapshot = await getDocs(ref);
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransitDashaReports(reports);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="bg-[#0B0F2F] p-6 rounded-lg shadow-lg border-2 border-yellow-500 w-full max-w-3xl mb-8">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">My Transit & Dasha Reports</h2>
      {transitDashaReports.length === 0 ? (
        <p className="text-yellow-200">No reports found.</p>
      ) : (
        <ul className="text-yellow-200 text-sm space-y-2">
          {transitDashaReports.map((report) => (
            <li key={report.id}>
              <b>Date:</b> {report.birthDate} | <b>Time:</b> {report.birthTime}
              <pre className="whitespace-pre-wrap break-words">{JSON.stringify(report.result, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;

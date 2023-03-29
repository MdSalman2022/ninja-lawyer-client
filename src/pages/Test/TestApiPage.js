import React, { useState, useEffect } from "react";
import { storage } from "../../assets/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { putDataToServer } from "../Dashboard/ProfilePage/ProfilePageUpdateData";
import { users_data } from "./users-data";
import { auth } from "../../assets/firebase.config";

export default function TestApiPage() {
  const [data, setData] = useState([1, 2, 3]);
  const [ren, setRen] = useState(1);

  useEffect(() => {
    const getLawyers = async () => {
      fetch(
        "https://ninja-lawyer-server.vercel.app/api/users/lawyer/unverified"
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    };
    getLawyers();
  }, [ren]);

  async function verifyLawyer(lawyerData) {
    lawyerData.verified = true;
    const sendData = { update_data: lawyerData };
    console.log(lawyerData.UID, sendData, "user");
    const putResult = await putDataToServer(lawyerData.UID, sendData, "user");
    console.log(putResult, "--00--");
    if (putResult === true) {
      if (ren === 1) {
        setRen(0);
      } else {
        setRen(1);
      }
    }
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    BarID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Specialties
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((lawyer) => {
                  return (
                    <tr key={lawyer._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {lawyer.UID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lawyer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lawyer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lawyer.bar}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="btn"
                          onClick={() => verifyLawyer(lawyer)}
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

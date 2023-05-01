import { sendUserLogs } from "../../../components/UserAuthentication/Login/LoginPostDB";

const updateData = (data, UID) => {
  console.log(data)
  const { name, email, contact, state, city, languages, specialties, rate, barYear, barID, id, summary } = data;

  return {
    update_data: {
      UID: UID,
      name,
      email,
      contact,
      state,
      city,
      languages: languages,
      specialties: specialties,
      rate,
      barYear,
      barID,
      id,
      summary,
    },
  };
};
// Lawyer data update
const putDataToServer = (id, data, user) => {
  console.log(user)
  console.log(data)
  let message = false;
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/lawyer/update/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "---===");
      if (data.acknowledged) {
        message = true;
        console.log("abcdefg");
        sendUserLogs(user, "profile_update")
      } else {
        message = false;
      }
    });
  return message;
};
// User data update
const putUserDataToServer = (id, data, user) => {
  console.log(user)
  console.log(data)
  console.log("++++", data);
  let message = false;
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/update/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.acknowledged) {
        message = true;
        console.log("abcdefg");
        sendUserLogs(user, "profile_update")
      } else {
        message = false;
      }
    });
};

export { updateData, putDataToServer, putUserDataToServer };

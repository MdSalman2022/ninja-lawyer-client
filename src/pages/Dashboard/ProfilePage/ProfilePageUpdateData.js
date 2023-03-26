const updateData = (data, UID) => {
  console.log(data)
  const { name, email, contact, state, city, languages, specialties, rate, year, bar, id, summary } = data;

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
      year,
      bar,
      id,
      summary,
    },
  };
};
// Lawyer data update
const putDataToServer = (id, data, user) => {
  console.log(user)
  console.log(data)
  fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/update/${id}`, {
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
      } else {
        message = false;
      }
    });
  return message;
};
<<<<<<< HEAD

const putUserDataToServer = async (id, data, user) => {
=======
// User data update
const putUserDataToServer = (id, data, user) => {
>>>>>>> salman
  console.log(user)
  console.log(data)
  console.log("++++", data);
  let message = false;
  await fetch(`https://ninja-lawyer-server.vercel.app/api/users/update/${id}`, {
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
      } else {
        message = false;
      }
    });
};

export { updateData, putDataToServer,putUserDataToServer };

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
      summary
    },
  };
};

const putDataToServer = (id, data, user) => {
  console.log(user)
  console.log(data)
  fetch(`http://localhost:5000/api/users/lawyer/update/${id}`, {
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
        return true;
      } else {
        return false;
      }
    });
};

const putUserDataToServer = (id, data, user) => {
  console.log(user)
  console.log(data)
  fetch(`https://ninja-lawyer-server.vercel.app/api/users/update/${id}`, {
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
        return true;
      } else {
        return false;
      }
    });
};

export { updateData, putDataToServer,putUserDataToServer };

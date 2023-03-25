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

const putDataToServer = async (id, data, user) => {
  console.log("++++", data);
  let message = false;
  // ninja-lawyer-server.vercel.app
  await fetch(
    `https://ninja-lawyer-server.vercel.app/api/users/lawyer/update/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
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

const putUserDataToServer = async (id, data, user) => {
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

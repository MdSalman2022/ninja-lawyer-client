const updateData = (data, UID) => {
  const name = data.name;
  console.log(name, "1224");
  const email = data.email;
  const contact = data.contact;
  const state = data.state;
  const city = data.city;
  const languages = data.languages;
  const specialties = data.specialties;
  const rate = data.rate;
  const year = data.year;
  const bar = data.bar;
  const id = data.id;
  const summary = data.summary;

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
  fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/update/${id}`, {
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

export { updateData, putDataToServer };

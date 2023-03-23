const updateData = (data, UID) => {
  const name = data.name;
  console.log(name, "1224");
  const email = data.email;
  const contact = data.contact;
  const state = data.state;
  const city = data.city;

  return {
    update_data: {
      UID: UID,
      name,
      email,
      contact,
      state,
      city,
    },
  };
};

const putDataToServer = (id, data) => {
  fetch(`https://ninja-lawyer-server.vercel.app/api/users/update/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.acknowledged) {
        return true;
      } else {
        return false;
      }
    });
};

export { updateData, putDataToServer };

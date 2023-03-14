const updateData = (event, UID) => {
  const form = event.target;
  const name = form.name.value;
  console.log(name, "1224");
  const email = form.email.value;
  const phone = form.phone.value;
  const location = form.location.value;
  const state = form.state.value;
  const city = form.city.value;
  const postalcode = form.postalcode.value;
  const address = form.address.value;
  const address2 = form.address2.value;
  console.log(location);
  return {
    update_data: {
      UID: UID,
      name,
      email,
      phone,
      location,
      state,
      city,
      postalcode,
      address,
      address2,
    },
  };
};

const putDataToServer = (id, data) => {
  fetch(`http://localhost:5000/api/users/update/${id}`, {
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

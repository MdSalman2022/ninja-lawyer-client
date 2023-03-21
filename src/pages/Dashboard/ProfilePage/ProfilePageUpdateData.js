const updateData = (event, UID) => {
  const form = event.target;
  const name = form.name.value;
  console.log(name, "1224");
  const email = form.email.value;
  const contact = form.contact.value; 
  const state = form.state.value;
  const city = form.city.value; 

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

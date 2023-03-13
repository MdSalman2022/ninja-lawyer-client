const sendToServer = (user, data) => {
  // try post api
  fetch("http://localhost:5000/api/users/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.acknowledged) {
        return data;
      } else {
        return false;
      }
    });
  //
};

export { sendToServer };

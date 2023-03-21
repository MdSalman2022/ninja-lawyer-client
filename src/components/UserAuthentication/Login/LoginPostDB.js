const sendToServer = (user, data) => {
  // try post api
  fetch("https://ninja-lawyer-server.vercel.app/api/users/add", {
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

const sendToServerLawyer = (user, data) => {
  // try post api
  fetch("https://ninja-lawyer-server.vercel.app/api/users/add-lawyer", {
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

export { sendToServer, sendToServerLawyer };

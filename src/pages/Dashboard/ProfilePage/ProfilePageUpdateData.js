const updateData = (event) => {
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const location = form.location.value;
  const state = form.state.value;
  const city = form.city.value;
  const postalcode = form.postalcode.value;
  const address = form.address.value;
  const address2 = form.address2.value;
  return {
    name,
    email,
    phone,
    location,
    state,
    city,
    postalcode,
    address,
    address2,
  };
};

export { updateData };

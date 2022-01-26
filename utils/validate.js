module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "please add a username";
  }
  if (email.trim() === "") {
    errors.email = "please add a email , it cannot be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "email need to be a valid email";
    }
  }
  if (password.trim() === "") {
    errors.password = "please create a password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "please add a username";
  }
  if (password.trim() === "") {
    errors.password = "please add a password";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

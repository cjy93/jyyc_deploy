export default function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPassword, setIsPassword] = React.useState(true);
  // props: props.adminUser props.setAdminUser
  let login = props.login;
  let setLogin = props.setLogin;
  let container;
  let successMsg = "Success!";
  let invalidMsg = "Either invalid username or incorrect password!";
  let emptyMsg = "Both username and password cannot be empty!";
  let usernameEle = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Email: "), /*#__PURE__*/React.createElement("input", {
    type: 'text',
    value: username,
    onChange: function (event) {
      setUsername(event.target.value);
    }
  }));
  let passwordEle = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Password: "), /*#__PURE__*/React.createElement("input", {
    type: isPassword ? 'password' : 'text',
    value: isPassword ? undefined : password,
    onChange: function (event) {
      setPassword(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("input", {
    id: "passwordBtn",
    type: 'button',
    value: isPassword ? 'Show password' : 'Hide password',
    onClick: function () {
      setIsPassword(!isPassword);
    }
  }));
  let submitEle = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: 'button',
    value: 'Login',
    onClick: function () {
      if (username === undefined || username === null || username.length <= 0) {
        alert(emptyMsg);
        return;
      }
      if (password === undefined || password === null || password.length <= 0) {
        alert(emptyMsg);
        return;
      }

      // For Fetching Login endpoint
      delete localStorage["tokenNew"]; // to remove existing token on load

      let userDetails = {
        user_email: username,
        password: password
      };
      const reqOption = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
          // Authorization: `Bearer ${token}`,
        }
      };

      fetch(`http://localhost:3000/login`, reqOption).then(response => {
        if (!response.ok) {
          console.log("Response", response);
          throw Error(`${response.status} error`);
        }
        // Read the response as json
        return response.json();
      }).then(data => {
        console.log(data);
        localStorage["tokenNew"] = data.token; // save new token
        console.log(password, username);
        setLogin(!login);
      }).catch(error => {
        alert(error);
      });

      // if (username === 'Rick' && password === '12345') {
      //     // alert(successMsg);
      //     props.setAdminUser(true);
      // } else {
      //     alert(invalidMsg)
      // }

      // fetch('api url')
      //     .then((response) => response.json())
      //     .then((jsonObj) => {
      //         alert(successMsg);
      //     })
      //     .catch((err) => {
      //         console.log(err)
      //         alert(invalidMsg);
      //     })
    }
  }));

  let logoutEle = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "button",
    value: "Logout",
    onClick: () => props.setAdminUser(false)
  }));
  if (!props.adminUser) {
    container = /*#__PURE__*/React.createElement("div", {
      id: "login"
    }, usernameEle, passwordEle, submitEle);
  } else {
    container = /*#__PURE__*/React.createElement("div", {
      id: "login"
    }, logoutEle);
  }
  return container;
}
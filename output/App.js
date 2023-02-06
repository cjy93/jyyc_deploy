//App.js //Delmovie.jsx WMFCA2
import Retrieve from "./Retrieve.js"; //view movies on record by current and genre and display using Disp component
import Create from "./Create.js"; //create new movie records
import { data } from "./Data.js"; //original database
import Delmovie from "./Delmovies.js";
import Login from "./Login.js";
import Editmovie from "./Editmovie.js";
export default function App() {
  const [showList, setShowList] = React.useState(data); //showList is all movies in record.
  const [login, setLogin] = React.useState(false); //true is successfully log-in as an Admin user
  const initVal = {
    movie_name: "",
    description: "",
    release_date: "",
    movie_image_url: "",
    genre_id_fk: 1,
    Active: 'N'
  };
  const [selctedMovie, setSelectedMovie] = React.useState(initVal);
  const [updateIndex, setUpdateIndex] = React.useState();

  //Fetch list of movie records 
  React.useEffect(() => {
    fetch('http://52.86.67.23:3000/movie').then(response => response.json()).then(data => {
      // extract movie from JSON data and setShowList with arr
      setShowList(data);
      console.log(showList);
    }).catch(err => console.log('Request Failed : ', err));
  }, []);
  React.useEffect(() => {
    console.log(showList);
  }, [data]);
  console.log("prop AT APP", showList);
  return /*#__PURE__*/React.createElement("div", {
    id: "main"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "banner"
  }, "Movie Management System"), /*#__PURE__*/React.createElement(Login, {
    setLogin: setLogin,
    login: login
  }), /*#__PURE__*/React.createElement(Retrieve, {
    movies: showList,
    updateIndex: updateIndex,
    setUpdateIndex: setUpdateIndex
  }), login && /*#__PURE__*/React.createElement(Create, {
    movies: showList,
    setShowList: setShowList
  }), login && /*#__PURE__*/React.createElement(Editmovie, {
    updateIndex: updateIndex,
    setShowList: setShowList,
    setUpdateIndex: setUpdateIndex,
    movies: showList
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React.createElement(App, null));
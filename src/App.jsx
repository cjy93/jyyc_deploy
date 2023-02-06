//App.js //Delmovie.jsx WMFCA2

import Retrieve from "./Retrieve"; //view movies on record by current and genre and display using Disp component
import Create from './Create'; //create new movie records
import { data } from './Data'; //original database
import Delmovie from './Delmovies';
import Login from './Login';
import Editmovie from './Editmovie';

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
  }
  const [selctedMovie, setSelectedMovie] = React.useState(initVal)

  const [updateIndex, setUpdateIndex] = React.useState()

  //Fetch list of movie records 
  React.useEffect(() => {
    fetch('https://52.86.67.23:3000/movie')
      .then(response => response.json())
      .then(data => {
        // extract movie from JSON data and setShowList with arr
        setShowList(data);
        console.log(showList);
      })
      .catch(err => console.log('Request Failed : ', err));
  }, []);
  React.useEffect(() => { console.log(showList) }, [data])

  console.log("prop AT APP", showList)
  return (
    <div id="main">
      <h1 id='banner'>Movie Management System</h1>

      <Login setLogin={setLogin}
        login={login} />

      {/* display all movie data with filters */}
      <Retrieve movies={showList} updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} />

      {/* Add movie data */}
      {login &&
        <Create movies={showList} setShowList={setShowList} />
      }

      {/* Update movie data */}
      {login &&
        <Editmovie updateIndex={updateIndex} setShowList={setShowList} setUpdateIndex={setUpdateIndex} movies={showList} />
      }

      {/* {login &&
        <Delmovie
          movies={showList}
          setMovies={setShowList}

          //single delete handler
          onHide={(index) => {
            showList.splice(index, 1); //delete a single movie using right mouseclick on movie name
            setShowList([...showList]);
          }} */}

      {/* //multiple delete
        // delSelectedMovie={(movList) => { console.log(movList) }}

        />
      } */}

    </div>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
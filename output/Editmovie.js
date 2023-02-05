export default function Editmovie(props) {
  const [movieName, setMovieName] = React.useState('');
  const [movieDesp, setMovieDesp] = React.useState('');
  const [releaseDate, setReleaseDate] = React.useState('  /  /  ');
  const [movieUrl, setMovieUrl] = React.useState('');
  const [genre, setGenre] = React.useState('Comedy');
  const [current, setCurrent] = React.useState(false);
  // props
  let updateIndex = props.updateIndex;
  let setUpdateIndex = props.setUpdateIndex;
  console.log(updateIndex);
  let movies = props.movies;
  let setShowList = props.setShowList;
  function updateMovie() {
    var genreNum = 1;
    if (genre == 'Comedy') {
      genreNum = 1;
    }
    if (genre == 'Thriller') {
      genreNum = 2;
    }
    if (genre == 'SciFic') {
      genreNum = 3;
    }
    if (genre == 'Drama') {
      genreNum = 4;
    }
    const newMovie = {
      m_name: movieName,
      desc: movieDesp,
      rel_date: releaseDate,
      url: movieUrl,
      genre: genreNum,
      active: current ? 'Y' : 'N'
    };
    console.log(newMovie); //new movie data encapsulated into an newMovie object for transfer to host side

    //start transfer process to backend
    // Fetch part
    const reqOption = {
      method: "PUT",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage["tokenNew"]}`
      }
    };
    fetch(`http://localhost:3000/movie_update/${updateIndex}`, reqOption).then(response => {
      console.log("response", response);
      if (!response.ok) {
        console.log("status code:", response.status);
        throw Error(`${response.status} error`);
      }
      // Read the response as json
      return response.json();
    }).then(data => {
      console.log(data);
      // props.setShowList([...props.movies, { movie_name: movieName, description: movieDesp, release_date: releaseDate, movie_image_url: movieUrl, genre_id_fk: genreNum, Active: current ? 'Y' : 'N', del: false }])
      movies.map(obj => {
        if (parseInt(obj.movie_id) == updateIndex) {
          obj.movie_name = movieName;
          obj.movie_id = updateIndex;
          obj.description = movieDesp;
          obj.movie_Active = current ? 'Y' : 'N';
          obj.release_date = releaseDate;
          obj.genre_id_fk = genreNum;
          obj.movie_image_url = movieUrl;
        }
      });
    }).catch(error => {
      alert(error);
    });
    setShowList(movies);
    setMovieName(''); //reset input of movie name after data is submitted
    setMovieDesp('');
    setReleaseDate('');
    setMovieUrl('');
    setCurrent(false);
    setGenre('Comedy');
    console.log("what movies", movies);
    // shallow copy to change location of list
    movies = JSON.parse(JSON.stringify(movies));
    console.log("what movies2", movies);
    setShowList(movies);
  }
  return /*#__PURE__*/React.createElement("div", {
    class: "createForm"
  }, /*#__PURE__*/React.createElement("h2", null, "Update Movie Records"), /*#__PURE__*/React.createElement("form", {
    id: "form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("h3", null, "Please enter Movie details"), "Movie Name:", /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: movieName,
    onChange: e => setMovieName(e.target.value)
  }), " ", /*#__PURE__*/React.createElement("br", null), "Description:", /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: movieDesp,
    onChange: e => setMovieDesp(e.target.value)
  }), " ", /*#__PURE__*/React.createElement("br", null), "Release Date:", /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: releaseDate,
    onChange: e => setReleaseDate(e.target.value)
  }), " ", /*#__PURE__*/React.createElement("br", null), "Movie URL:", /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: movieUrl,
    onChange: e => setMovieUrl(e.target.value)
  }), " ", /*#__PURE__*/React.createElement("br", null), "Genre:", /*#__PURE__*/React.createElement("select", {
    id: "selGenreBtn2",
    value: genre,
    onChange: e => setGenre(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "Comedy"
  }, "Comedy"), /*#__PURE__*/React.createElement("option", {
    value: "Thriller"
  }, "Thriller"), /*#__PURE__*/React.createElement("option", {
    value: "SciFic"
  }, "Sci-Fic"), /*#__PURE__*/React.createElement("option", {
    value: "Drama"
  }, "Drama")), /*#__PURE__*/React.createElement("br", null), "Movie will be premiered or currently on show?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "current",
    name: "current",
    checked: current,
    onChange: () => setCurrent(!current)
  }), /*#__PURE__*/React.createElement("label", null, "Please check if Yes."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
    class: "formBtn",
    disabled: movieName == '' //button is disabled if movie name is blank
    ,
    onClick: () => {
      updateMovie();
    }
  }, "Submit")));
}
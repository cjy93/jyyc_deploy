export default function Create(props) {
  const [movieName, setMovieName] = React.useState('');
  const [movieDesp, setMovieDesp] = React.useState('');
  const [releaseDate, setReleaseDate] = React.useState('  /  /  ');
  const [movieUrl, setMovieUrl] = React.useState('');
  const [genre, setGenre] = React.useState('Comedy');
  const [current, setCurrent] = React.useState(false);
  function uploadMovie() {
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
      movie_name: movieName,
      description: movieDesp,
      release_date: releaseDate,
      movie_image_url: movieUrl,
      genre_id_fk: genreNum,
      Active: current ? 'Y' : 'N'
    };
    console.log(newMovie); //new movie data encapsulated into an newMovie object for transfer to host side

    //start transfer process to backend
    // let token = JSON.parse(localStorage.getItem("token"));  

    const reqOption = {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage["tokenNew"]}`
      }
    };
    fetch(`http://localhost:3000/movie_add`, reqOption).then(response => {
      if (!response.ok) {
        console.log("status code:", response.status);
        throw Error(`${response.status} error`);
      }
      // Read the response as json
      return response.json();
    }).then(data => {
      console.log(data);
      props.setShowList([...props.movies, {
        movie_id: 100000,
        movie_name: movieName,
        description: movieDesp,
        release_date: releaseDate,
        movie_image_url: movieUrl,
        genre_id_fk: genreNum,
        Active: current ? 'Y' : 'N',
        del: false
      }]);
      setMovieName(''); //reset input of movie name after data is submitted
      setMovieDesp('');
      setReleaseDate('');
      setMovieUrl('');
      setCurrent(false);
      setGenre('Comedy');
      {
        console.log(props.movies);
      }
    }).catch(error => {
      alert(error);
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    class: "createForm"
  }, /*#__PURE__*/React.createElement("h2", null, "Create New Movie Records"), /*#__PURE__*/React.createElement("form", {
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
    id: "selGenreBtn",
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
      uploadMovie();
    }
  }, "Submit")));
}
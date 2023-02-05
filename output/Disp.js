import Editmovie from "./Editmovie.js";
export default function Disp(props) {
  // props: movies,current, genre
  const current = props.current;
  const setCurrent = props.setCurrent;
  const genre = props.genre;
  const setGenre = props.setGenre;
  const updateIndex = props.updateIndex;
  const setUpdateIndex = props.setUpdateIndex;
  console.log("prop", props.movies);
  const mov = props.movies.map((movie, index) =>
  /*#__PURE__*/
  //create a data table of movie database
  React.createElement("tr", {
    key: index
  }, /*#__PURE__*/React.createElement("td", {
    class: "name"
  }, movie.movie_name), /*#__PURE__*/React.createElement("td", {
    class: "description"
  }, movie.description), /*#__PURE__*/React.createElement("td", {
    class: "date"
  }, movie.release_date.slice(0, 10)), /*#__PURE__*/React.createElement("td", {
    class: "movie_image_url"
  }, movie.movie_image_url), /*#__PURE__*/React.createElement("td", {
    class: "genre"
  }, movie.genre_id_fk), /*#__PURE__*/React.createElement("td", {
    class: "col"
  }, movie.Active), /*#__PURE__*/React.createElement("td", null, " ", /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setUpdateIndex(movie.movie_id);
    },
    class: "col"
  }, "\u270F\uFE0F")))));
  return /*#__PURE__*/React.createElement("div", {
    class: "showTable"
  }, /*#__PURE__*/React.createElement("h2", null, "List of ", props.current ? "Movies on Show." : "all Movies in record."), /*#__PURE__*/React.createElement("button", {
    id: "currentBtn",
    onClick: () => {
      if (current == 'Y') {
        setCurrent('N');
      } else {
        setCurrent('Y');
      }
    }
  }, "List ", current ? 'All' : 'Current', " Button"), /*#__PURE__*/React.createElement("select", {
    id: "genreBtn",
    onChange: e => setGenre(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    defaultValue: "All Genres",
    selected: true
  }, "All Genres"), /*#__PURE__*/React.createElement("option", {
    value: "Comedy"
  }, "Comedy"), /*#__PURE__*/React.createElement("option", {
    value: "Thriller"
  }, "Thriller"), /*#__PURE__*/React.createElement("option", {
    value: "SciFic"
  }, "Sci-Fic"), /*#__PURE__*/React.createElement("option", {
    value: "Drama"
  }, "Drama")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Movie Name"), /*#__PURE__*/React.createElement("th", null, "Description"), /*#__PURE__*/React.createElement("th", null, "Release Date"), /*#__PURE__*/React.createElement("th", null, "URL"), /*#__PURE__*/React.createElement("th", null, "Genre"), /*#__PURE__*/React.createElement("th", null, "Showing NOW"), /*#__PURE__*/React.createElement("th", null, "Edit Movie")), mov, /*#__PURE__*/React.createElement("button", {
    onClick: () => setUpdateIndex(1000)
  }, "Refresh"));
}
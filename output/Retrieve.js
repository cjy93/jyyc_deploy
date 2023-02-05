import Disp from "./Disp.js"; // props.movies
export default function Retrieve(props) {
  const [current, setCurrent] = React.useState('N');
  const [genre, setGenre] = React.useState('All Genres');
  let listItem;
  let updateIndex = props.updateIndex;
  let setUpdateIndex = props.setUpdateIndex;

  //filter current and genre before sending for display
  if (current == 'Y') {
    listItem = props.movies.filter(movie => movie.Active === "Y");
  } else {
    if (current == 'N') {
      listItem = props.movies;
    }
  }
  if (genre !== 'All Genres') {
    listItem = listItem.filter(movie => movie.genre_id_fk === genre);
  }
  // listItem=props.movies for 1st render

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Disp, {
    movies: listItem,
    current: current,
    setCurrent: setCurrent,
    genre: genre,
    setGenre: setGenre,
    updateIndex: updateIndex,
    setUpdateIndex: setUpdateIndex
  }));
}
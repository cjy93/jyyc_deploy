//Delmovie.jsx WMFCA2

export default function Delmovie(props) {
  const movList = props.movies;
  const setMovList = props.setMovies;
  const mov = movList.map((mList, index) => /*#__PURE__*/React.createElement("tr", {
    key: index
  }, /*#__PURE__*/React.createElement("th", {
    onClick: () => {
      props.onHide(index);
    }
  }, mList.name), /*#__PURE__*/React.createElement("th", null, mList.genre), /*#__PURE__*/React.createElement("th", null, mList.current ? 'Yes' : 'No'), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: mList.del,
    onChange: () => {
      mList.del = !mList.del;
      setMovList([...movList]);
      console.log("This Index: ", index, mList.del);
    }
  }))));
  function delSelectedMovie() {
    let tmpList = movList.filter(mov => mov.del === false);
    console.log("movList: GrpBTN", tmpList);
    for (let i = tmpList.length; i < 0; i--) {
      console.log(tmpList[i]);
    }
    setMovList([...tmpList]);
  }
  return /*#__PURE__*/React.createElement("div", {
    class: "showTable"
  }, /*#__PURE__*/React.createElement("h2", null, "Batch deletion of movies"), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Movie Name"), /*#__PURE__*/React.createElement("th", null, "Genre"), /*#__PURE__*/React.createElement("th", null, "Showing NOW"), /*#__PURE__*/React.createElement("th", null, "Select Delete")), mov, /*#__PURE__*/React.createElement("button", {
    class: "formBtn",
    onClick: delSelectedMovie
  }, "Confirm Delete Selected Movies"));
}
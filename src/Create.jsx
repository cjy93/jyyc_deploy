export default function Create(props) {
    const [movieName, setMovieName] = React.useState('');
    const [movieDesp, setMovieDesp] = React.useState('');
    const [releaseDate, setReleaseDate] = React.useState('  /  /  ');
    const [movieUrl, setMovieUrl] = React.useState('');
    const [genre, setGenre] = React.useState('Comedy');
    const [current, setCurrent] = React.useState(false);

    function uploadMovie() {
        var genreNum = 1;
        if (genre == 'Comedy') { genreNum = 1 }
        if (genre == 'Thriller') { genreNum = 2 }
        if (genre == 'SciFic') { genreNum = 3 }
        if (genre == 'Drama') { genreNum = 4 }
        const newMovie = {
            movie_name: movieName,
            description: movieDesp,
            release_date: releaseDate,
            movie_image_url: movieUrl,
            genre_id_fk: genreNum,
            Active: current ? 'Y' : 'N'
        }
        console.log(newMovie)//new movie data encapsulated into an newMovie object for transfer to host side

        //start transfer process to backend
        // let token = JSON.parse(localStorage.getItem("token"));  

        const reqOption = {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${localStorage["tokenNew"]}`,
            },
        };

        fetch(`https://localhost:3000/movie_add`, reqOption)
            .then((response) => {
                if (!response.ok) {
                    console.log("status code:", response.status);
                    throw Error(`${response.status} error`);
                }
                // Read the response as json
                return response.json();
            })
            .then((data) => {
                console.log(data);
                props.setShowList([...props.movies, { movie_id: 100000, movie_name: movieName, description: movieDesp, release_date: releaseDate, movie_image_url: movieUrl, genre_id_fk: genreNum, Active: current ? 'Y' : 'N', del: false }])
                setMovieName('') //reset input of movie name after data is submitted
                setMovieDesp('')
                setReleaseDate('')
                setMovieUrl('')
                setCurrent(false)
                setGenre('Comedy')
                { console.log(props.movies) }
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (<div class='createForm'>
        <h2>Create New Movie Records</h2>
        <form id='form' onSubmit={(e) => e.preventDefault()}>
            <h3>Please enter Movie details</h3>
            Movie Name:
            <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} /> <br></br>
            Description:
            <input type="text" value={movieDesp} onChange={(e) => setMovieDesp(e.target.value)} /> <br></br>
            Release Date:
            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /> <br></br>
            Movie URL:
            <input type="text" value={movieUrl} onChange={(e) => setMovieUrl(e.target.value)} /> <br></br>

            {/* select genre from a fix list */}
            Genre:
            <select id='selGenreBtn' value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
                <option value="SciFic">Sci-Fic</option>
                <option value="Drama" >Drama</option>
            </select><br></br>

            {/* checked if movie will be current or on show */}
            Movie will be premiered or currently on show?<br></br>
            <input type="checkbox" id="current" name="current" checked={current} onChange={() => setCurrent(!current)} />
            <label>Please check if Yes.</label><br></br>

            <br /><br />
            <button
                class='formBtn'
                disabled={movieName == ('')} //button is disabled if movie name is blank
                onClick={() => {
                    uploadMovie()
                }}>
                Submit
            </button>
        </form>
    </div>
    );
}
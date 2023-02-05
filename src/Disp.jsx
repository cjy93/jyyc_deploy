import Editmovie from './Editmovie';

export default function Disp(props) {
    // props: movies,current, genre
    const current = props.current;
    const setCurrent = props.setCurrent;
    const genre = props.genre;
    const setGenre = props.setGenre;
    const updateIndex = props.updateIndex
    const setUpdateIndex = props.setUpdateIndex

    console.log("prop", props.movies)

    const mov = props.movies.map((movie, index) => ( //create a data table of movie database
        < tr key={index} >
            <td class='name'>{movie.movie_name}</td>
            <td class='description'>{movie.description}</td>
            <td class='date'>{movie.release_date.slice(0, 10)}</td>
            <td class='movie_image_url'>{movie.movie_image_url}</td>
            <td class='genre'>{movie.genre_id_fk}</td>
            <td class='col'>{movie.Active}</td>
            <td> <><button onClick={() => { setUpdateIndex(movie.movie_id) }} class='col'>✏️</button></></td>
        </tr >
    ));

    return (
        <div class='showTable'>
            {/* this title will toggle between current or all shows to be listed */}
            <h2>List of {props.current ? "Movies on Show." : "all Movies in record."}</h2>
            <button id='currentBtn' onClick={() => {
                if (current == 'Y') {
                    setCurrent('N')
                } else {
                    setCurrent('Y')
                }
            }
            }>List {current ? 'All' : 'Current'} Button</button>

            {/* filter by genre */}
            <select id="genreBtn" onChange={(e) => setGenre(e.target.value)}>
                <option defaultValue="All Genres" selected>All Genres</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
                <option value="SciFic">Sci-Fic</option>
                <option value="Drama" >Drama</option>
            </select>
            <tr>
                <th>Movie Name</th>
                <th>Description</th>
                <th>Release Date</th>
                <th>URL</th>
                <th>Genre</th>
                <th>Showing NOW</th>
                <th>Edit Movie</th>
            </tr>
            {mov}
            {/* Refresh button so the updates would go through. Put arbitrary number for "setUpdateIndex" */}
            <button onClick={() => setUpdateIndex(1000)}>Refresh</button>
        </div>
    );

}
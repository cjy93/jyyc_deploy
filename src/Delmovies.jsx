//Delmovie.jsx WMFCA2

export default function Delmovie(props) {
    const movList = props.movies;
    const setMovList=props.setMovies;
    const mov = movList.map((mList, index) => (
        <tr key={index}>
            <th onClick={() => { props.onHide(index) }}>{mList.name}</th>
            <th>{mList.genre}</th>
            <th>{mList.current ? 'Yes' : 'No'}</th>
            <th><input  type="checkbox" 
                        checked={mList.del} 
                        onChange={()=>{
                                mList.del=!mList.del;
                                setMovList([...movList]);
                                console.log("This Index: ",index,mList.del);
                            }     
                        }/>
            </th>
        </tr>
    )); 
    
    function delSelectedMovie(){
        let tmpList=movList.filter((mov)=>mov.del===false);
        console.log("movList: GrpBTN", tmpList);
        for(let i=tmpList.length;i<0;i--){
            console.log(tmpList[i]);
        }
        setMovList([...tmpList]);
    }

    return (
        <div class='showTable'>
            <h2>Batch deletion of movies</h2>
            <tr><th>Movie Name</th><th>Genre</th><th>Showing NOW</th><th>Select Delete</th></tr>
            {mov}
            <button 
                class='formBtn' 
                onClick={delSelectedMovie}
            >Confirm Delete Selected Movies</button>
        </div>
    )
}
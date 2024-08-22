import { Link } from "react-router-dom";


const Home = () => {
return(
    <>
    <h1 className="text-3xl font-bold underline">
        This is the Home component
        Here canvas component will be rendered
    </h1>
    <button className="m-10"><Link to='/test'>Test</Link></button>
    </>
)
}

export default Home;
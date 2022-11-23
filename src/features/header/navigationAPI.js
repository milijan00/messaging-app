import axios from "axios";

const url = "http://localhost:3000/navlinks";
export async function fetch(){
    return await axios.get(url);
}

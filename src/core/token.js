const error  ="Token cannot be extracted.";
const get = ()=>{
    try{
        let str = localStorage.getItem("access");
        if(str){
            let payload = str.split(".")[1];
            if(payload){
                let json = JSON.parse(atob(payload));
               return json; 
            }
            throw new error;
        }
        throw new error;
    }
    catch(err){
        return null;
    }
}
/*
const getPrevious = ()=>{
    try{
        return localStorage.getItem("previousUser");
    }
    catch(err){
        return null;
    }
}
*/

export default {
    get,
}



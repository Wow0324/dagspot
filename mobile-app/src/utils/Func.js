import axios from "axios";
import server from '../config/server';

export const toCapitalize = (str)=>{
    if(str.length == 0){
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const validateEmail = (email)=>{
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const PostRequest = (url, body, callback, errCallback)=>{
    axios
        .post(`${server.URL}/${url}`, body)
        .then((response)=>callback(response))
        .catch((err)=>errCallback(err));
}

import React,{ useState } from "react"
export default function Search({onsearch}){
    const [data,setData]=useState('');
    const handleChange=(e)=>{
        const value=e.target.value;
        setData(value);
        onsearch?.(value);
    }
    return(
        <div className="search">
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type='text'className="search-input" value={data} onChange={handleChange} placeholder="Search for Right School,Tuition & Activity." />
        </div>
    )
}
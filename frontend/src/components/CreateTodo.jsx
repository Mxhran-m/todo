import { useState } from "react";

export function CreateTodo() {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  return (
    <div>
      <input type="text" placeholder="title" onChange={function(e){
        const value = e.target.value;
        settitle(value)
      }} /> <br />
      <input type="text" placeholder="description" onChange={function(e){
        const value = e.target.value;
        setdescription(value);
      }} /> <br />
      <button onClick={()=>{
        fetch("http://localhost:3000/todo",{
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description
          }),
          headers: {
            "content-type": "application/json"
          }
        }).then(async function(res){
          const json = await res.json();
          alert("Todo is added")
          window.location.reload();
        })
      }}> Add a todo</button>
    </div>
  );
}

import React, { useState } from 'react';
import { celebrity } from '../interfaces';

interface Props {
  celebrity: celebrity,
  handleDelete:(celebrity:celebrity) => void
}

const Accordion: React.FC<Props> = ({ celebrity ,handleDelete}) => {
  
  
  const calculateAge = (dob:Date | number) => {
    const currentYear = new Date().getFullYear()
    const dobYear =  dob ? new Date(dob).getFullYear() :  currentYear
    return  currentYear - dobYear
  }
  
  
  const [open, setOpen] = useState<boolean>(false);
  const [editState,setEditState] = useState({
    gender:"",
    age:calculateAge(celebrity?.dob),
    first:"",
    description:"",
    country:""
  })

  const[isEditable,setIsEditable]= useState<boolean>(false)

  
  const toggleAccordion = () => {
    setOpen((prev) => !prev);
  };

  


  const handleEdit = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
     const { name, value } = event.target;
     setEditState((prev) => ({
         ...prev,
         [name]:value
     }))
  }


  return (
    <div
    tabIndex={0}
     className={`max-w-lg my-8  ${ open  ? "border-black border-2 rounded-lg p-4" : ""}`}>
      <div className={`flex items-center justify-between mt-5  ${ !open  ? "border-black border-2 rounded-lg p-4" : ""}`}>
        <div className="flex items-center">
          <img src={celebrity?.picture} className="rounded-full w-20 h-20" alt={celebrity?.first} />
         {isEditable ? <input name="first" onChange={handleEdit}  value={editState?.first || celebrity?.first} className="w-full rounded-md border border-black mt-1 mx-3 p-2"/> : 
          <h1 className="ml-5 text-xl">{editState?.first || celebrity?.first}</h1>}
        </div>
        <p  onClick={toggleAccordion} className={`text-right cursor-pointer text-4xl  ${open ? "rotate-180" : ""}`}>{"^"}</p>
      </div>

      {open && (
        <div className="mt-5 ">
          <div className="flex gap-4">
            <div className="w-1/3">
              <label htmlFor="age" className="block text-left">Age</label>
              {isEditable ? 
              <input 
              type="number" 
              id="age" 
              name="age" 
              onChange={handleEdit} 
              className="w-full rounded-md border border-black mt-1" 
              value={editState.age} 
            />
                : 
                <p className="text-left">
                  { editState.age || calculateAge(celebrity?.dob)}
                </p>
                 }
            </div>
            <div className="w-1/3">
              <label htmlFor="gender" className="block text-left">Gender</label>
             {isEditable  ? <select id="gender" onChange={handleEdit} name="gender" value={editState?.gender || celebrity?.gender}className="w-full rounded-md border border-black mt-1">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select> : 
              <p className="text-left">{editState?.gender || celebrity?.gender}</p>}
            </div>
            <div className="w-1/3">
              <label htmlFor="country" className="block text-left">Country</label>
              {isEditable ? 
              <input type="text" id="country" name="country" onChange={handleEdit} value={editState?.country || celebrity?.country} className="w-full rounded-md border border-black mt-1" />
              : <p className="text-left">{editState?.country || celebrity?.country}</p>}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-left">Description</h3>
            {isEditable ? 
            <textarea  onChange={handleEdit} name="description" className="block w-full px-4 py-2 mt-1 rounded-md border border-black" value={editState?.description || celebrity?.description || ""}></textarea>
            : 
            <p className="text-left">{editState?.description || celebrity?.description || ""}</p>}
          </div>


          <div className="block text-right mt-4">
            <button className="mx-2" onClick={() => {
              setIsEditable((prev) => !prev)
              }}>{ isEditable ? "Save" : "Edit" }</button>
            {isEditable ? <button onClick={() =>  setIsEditable((prev) => !prev)}>Cancle</button> :
            <button onClick={() => handleDelete(celebrity)}>Delete</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;


import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function ContactMan ()
{
    const [contacts,setContacts] = useState({
        Name:'',
        Email:'',
        Phone:0
    }
    )

    const [emailError, setEmailError] = useState('');
    const [phoneError,setPhoneError]= useState('')

    const [contactList,setContactList] = useState([])

    const handleChange =(e)=>
    {
        setContacts({...contacts, [e.target.name]:e.target.value})

    }
    
    const handleAdd = () => {
        if (contactList.some((cl) => cl.Email === contacts.Email)) {
            setEmailError('Email already taken');
            return;
        }
    
        else if (contacts.Phone.length > 10) {
            setPhoneError('Mobile number should not be more than 10 digits');
            return;
        }
        else{
            // Clear errors if no issues
        setEmailError('');
        setPhoneError('');
    
        setContactList([...contactList, contacts]);
        setContacts({ Name: '', Email: '', Phone: '' });

        }
    
        
    };
    

    
    const handleEdit=(index,field)=>
    {
        const currentContact = contactList[index];
        const editedData = prompt('Edit',currentContact[field]);

        if(editedData)
        {
            const updatedContact = contactList.map((contact,i)=> i===index?
        {...contact, [field]:editedData}:contact);
        setContactList(updatedContact)

        }

    }

    const handleRemove=(index)=>
    {
        const filteredList = contactList.filter((cl,i)=> i!==index);
        setContactList(filteredList);

    }





    return(
        <div>
            <h2 style={{textAlign:'center'}}>Contact Manager</h2>
            <div className="col-12">
                <label className="form-label">Name:</label>
                <input className="form-control" type="text" onChange={handleChange} name="Name" value={contacts.Name}/>
            </div>
            <div className="col-12">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" onChange={handleChange} name="Email" value={contacts.Email}/>
            </div>
            <div className="col-12">
                <label className="form-label">Phone </label>
                <input className="form-control" type="number" onChange={handleChange} name="Phone" value={contacts.Phone}/>
            </div><br/>
            <button className="btn btn-primary" onClick={handleAdd}>Add Contact</button>


            <div>
                {contactList.map((c,index)=>  
               <div > <div className="d-flex align-items-center mb-2">
               <label className="me-2">Name:</label>
               <p className="me-2 mb-0">{c.Name}</p>
               <button className="btn btn-success btn-sm " onClick={()=>handleEdit(index,'Name')}>Edit</button>
           </div> 
           <label className="me-2">Email: </label> <p className="me-2 mb-0">{c.Email}</p> 
           <button className="btn btn-success btn-sm "  onClick={()=>handleEdit(index,'Email')}>Edit</button><br/>
           <label className="me-2">Phone: </label><p className="me-2 mb-0">{c.Phone}</p> 
           <button className="btn btn-success btn-sm "  onClick={()=>handleEdit(index,'Phone')}>Edit</button>
               <br/> <button className="btn btn-danger btn-sm mt-2" onClick={()=>handleRemove(index)} >Remove</button>

                </div>)}
                

            </div>

           


        </div>
    )

}

export default ContactMan;
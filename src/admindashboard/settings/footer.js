import { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import axios from "axios";

const Footer = () => {

    const [ footer,setFooter ] = useState( {
        textColor : "",
        backgroundColor : "",
        footerContent : []
    });

   const fetchFooter = async() => {
      try {
        const response = await axios.get('http://localhost:8080/settings/footer/FOOTER');
        setFooter(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.error(error);
      }
   };

   useEffect(() => {
    fetchFooter();
   },[])    

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFooter((prevFooter) => ({
      ...prevFooter,
      [name]: value,
    }));
  };

  const updateFooter = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.put('http://localhost:8080/settings/update/footer/FOOTER',null,
            {
                params : {
                    textColor : footer.textColor,
                    backgroundColor : footer.backgroundColor,
                    footerContent : footer.footerContent
                }
            }
        );
        if(response.success === 200){
            fetchFooter();
            alert('Footer updated successfully')
        }
    } catch (error) {
           console.error(error);
           alert('Error updating details')           
    }
  };

    return (
        <>
            <Dashboard />
            <Navbar />

            <form className="contact-us-form" onSubmit={updateFooter}>

                <div className="contact-us-row" >
                    <label className="contact-us-label" >Footer</label>
                    
                        <input
                            className="contact-us-input"
                            type='text'
                            name="footerContent"
                            placeholder='Field to add in footer'
                            onChange={handleChange}
                            value={footer?.footerContent}
                        />
                        
                </div>


                <div className="contact-us-row">
                    <label className="contact-us-label">Footer Color</label>
                    <input
                        className="contact-us-input"
                        type="text"
                        name="backgroundColor"
                        placeholder="Footer color code"
                        value={footer?.backgroundColor}
                        onChange={handleChange}
                    />
                </div>

                <div className="contact-us-row">
                    <label className="contact-us-label">Text Color</label>
                    <input
                        className="contact-us-input"
                        type="text"
                        placeholder="Text color code"
                        name="textColor"
                        onChange={handleChange}
                        value={footer?.textColor}
                    />
                </div>

                <button className="absolute bottom-8 right-8 p-2 bg-cta rounded-md text-white" type="submit">Update</button>
            </form>

        </>
    )
};
export default Footer;
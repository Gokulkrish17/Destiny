import { useCallback, useEffect, useState } from "react";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import axios from "axios";

const SocialMedia = () => {

    const [ socialmedia, setSocialMedia ] = useState({
        facebookId : "",
        twitterId : "",
        instagramId : "",
        youtubeId : "",
        githubId : "",
        linkedinId : ""
    }
    );

    const fetchSocialMediaURL = useCallback( async() => {
        try {
            const response = await axios.get('http://localhost:8080/settings/social-media/SOCIAL_MEDIA');
            setSocialMedia(response.data);
        } catch (error) {
            console.error("Error fetching social media url",error);
        }
    },[])

    useEffect(() => {
        fetchSocialMediaURL();
    },[fetchSocialMediaURL])

    const handleChange = (e) => {
        const { name,value } = e.target;
        setSocialMedia((prevSocialMedia) => ({
            ...socialmedia,
            [name] : value
        }));
    }

    const updateSocialMedia = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/settings/update/social-media/SOCIAL_MEDIA',
                null,
                {
                    params : {
                        facebookId : socialmedia.facebookId,
                        twitterId : socialmedia.twitterId,
                        instagramId : socialmedia.instagramId,
                        youtubeId : socialmedia.youtubeId,
                        githubId : socialmedia.githubId,
                        linkedinId : socialmedia.linkedinId
                    }
                }
            );

            if(response.status === 200){
                alert("Details updated")
                fetchSocialMediaURL();
            }
        } catch (error) {
            alert("Failed to update details")
            console.error("Error fetching details",error);
            
        }
    };

    return(
        <>
        <Dashboard/>
        <Navbar/>

        <form className="contact-us-form" onSubmit={updateSocialMedia}>
        <div className="contact-us-row">
          <label className="contact-us-label">Facebook</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's facebook id"
            value={socialmedia?.facebookId}
            name="facebookId"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Twitter</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's twitter id"
            value={socialmedia.twitterId}
            name="twitterId"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Instagram</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's instagram id"
            value={socialmedia.instagramId}
            name="instagramId"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">You Tube</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's youtube id"
            value={socialmedia.youtubeId}
            name="youtubeId"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">GitHub</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's github id"
            value={socialmedia.githubId}
            name="githubId"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">LinkedIn</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's linkedin id"
            value={socialmedia.linkedinId}
            name="linkedinId"
            onChange={handleChange}
          />
        </div>

        <button
          className="absolute bottom-8 right-8 p-2 bg-cta rounded-md text-white"
          type="submit"
        >
          Update
        </button>
      </form>
        </>
    )
};
export default SocialMedia;
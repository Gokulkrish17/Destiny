import { useState, useEffect, useCallback } from "react";
import Dashboard from "../Common/dashboard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ArtistInformation = () => {

  const [artistInformation, setArtistInformation] = useState({});
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("Personal Information");
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    "Personal Information",
    "Professional Experience",
    "Physical Attribute",
    "Social Media Accounts",
    "Availability",
    "Additional Information",
  ];


  const getArtistInformation = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/api/profession/get-all-details/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setArtistInformation(response.data)
    } catch (error) {
      console.error(error);

    }
  }, [id]);

  useEffect(() => {
    getArtistInformation();
  }, [getArtistInformation])

  const {
    artistPersonalInformation,
    physicalAttribute,
    professionalExperience,
    socialMediaAccounts,
    availability,
    additionalInformation
  } = artistInformation || {};

  if (Object.values(artistInformation).every(value => value === null)) {
    return (
      <>
        <Dashboard />
        <p className='mt-[6rem] ml-[18rem] mr-8 mb-10 h-fit text-lg'>Professional Details not found....!</p>
      </>
    )
  }

  const personalPath = `/user/${artistPersonalInformation?.email}/detail`;
  const professionalPath = `/artist/${artistPersonalInformation?.userId}/detail`;

  const isPersonalActive = location.pathname === personalPath;

  return (
    <>
      <Dashboard />

      <div className="ml-[18rem] mr-[2rem] relative top-24">
        <div className="flex items-center justify-between text-sm font-medium text-gray-500 ml-1 mb-4">

          {/* Breadcrumb Section */}
          <div className="flex items-center">
            <span>Menu</span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-500">User</span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-500 cursor-pointer" onClick={() => navigate('/artist-crew-details')}>
              Professional Information
            </span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-300">{artistPersonalInformation.fullName}</span>
          </div>

          {/* Buttons Section (Right-Aligned) */}
          <div className="flex space-x-4">
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${isPersonalActive ? "bg-green-600 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
                }`}
              onClick={() => navigate(personalPath)}
            >
              Personal Details
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${!isPersonalActive ? "bg-green-600 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
                }`}
              onClick={() => navigate(professionalPath)}
            >
              Professional Details
            </button>
          </div>

        </div>

        <ul className="flex flex-wrap space-x-4 p-2 pl-6">
          {sections.map((section) => (
            <li
              key={section}
              className={`bg-black p-2 border text-white hover:bg-gray-600 cursor-pointer ${activeSection === section ? "bg-gray-600" : ""
                }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          ))}

        </ul>
      </div>

      <form className="contact-us-form">
        {activeSection === "Personal Information" && (
          <>
            <div className="contact-us-row">
              <label className="contact-us-label">User Type</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="User Type"
                value={artistPersonalInformation?.userType || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">User Id</label>
              <input
                className="contact-us-input"
                type="number"
                placeholder="User Id"
                value={artistPersonalInformation?.userId || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Full Name</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Full Name"
                value={artistPersonalInformation?.fullName || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Stage Name</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Stage Password"
                value={artistPersonalInformation?.stageName || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Gender</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Gender"
                value={artistPersonalInformation?.gender || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Date of Birth</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Date of Birth"
                value={artistPersonalInformation?.dob || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Email</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Email"
                value={artistPersonalInformation?.email || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Nationality</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Nationality"
                value={artistPersonalInformation?.nationality || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Ethnicity</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Ethnicity"
                value={artistPersonalInformation?.ethnicity || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Marital Status</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Marital Status"
                value={artistPersonalInformation?.maritalStatus || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Languages Known</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Languages Known"
                value={artistPersonalInformation?.languagesKnown || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Mobile Number</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Mobile Number"
                value={artistPersonalInformation?.mobileNumber || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Address</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Address"
                value={artistPersonalInformation?.address || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Native Language</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Native Language"
                value={artistPersonalInformation?.nativeLanguage || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Emergency Contact</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Emergency Contact"
                value={artistPersonalInformation?.emergencyContact || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Current Residency</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Current Residency"
                value={artistPersonalInformation?.currentResidency || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Profile Summary</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Profile Summary"
                value={artistPersonalInformation?.profileSummary || ""}
                readOnly
              />
            </div>
          </>
        )}

        {activeSection === "Professional Experience" && (
          <>
            {/* Professional Experience Form */}

            <div className="contact-us-row">
              <label className="contact-us-label">Acting Experience (Years)</label>
              <input
                className="contact-us-input"
                type="number"
                placeholder="Acting Experience"
                value={professionalExperience?.actingExperience || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Acting Roles</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Acting Roles"
                value={professionalExperience?.actingRoles || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Previous Projects</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Previous Projects"
                value={professionalExperience?.previousProjects || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Notable Directors Worked With</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Notable Directors"
                value={professionalExperience?.notableDirectorsWorkedWith || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Vocal Range</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Vocal Range"
                value={professionalExperience?.vocalRange || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Skills & Expertise</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Skills & Expertise"
                value={professionalExperience?.skillsAndExpertise || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Dance Scenes</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Dance Scenes"
                value={professionalExperience?.danceScenes || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Accents & Dialects</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Accents & Dialects"
                value={professionalExperience?.accentsAndDialects || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Awards & Achievements</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Awards & Achievements"
                value={professionalExperience?.awardsAndAchievements || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Method Acting Techniques</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Method Acting Techniques"
                value={professionalExperience?.methodActingTechniques || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Improvisation Experience</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Improvisation Experience"
                value={professionalExperience?.improvisationExperience || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">On-Stage & Theatre Works</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="On-Stage & Theatre Works"
                value={professionalExperience?.onStageAndTheatreWorks || ""}
                readOnly
              />
            </div>

            <div className="contact-us-row">
              <label className="contact-us-label">Fight & Action Scenes</label>
              <input
                className="contact-us-input"
                type="text"
                placeholder="Fight & Action Scenes"
                value={professionalExperience?.fightAndActionScenes || ""}
                readOnly
              />
            </div>
          </>
        )}

        {
          activeSection === "Physical Attribute" && (
            <>
              {/* Physical Attributes Form */}

              <div className="contact-us-row">
                <label className="contact-us-label">Height</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Height"
                  value={physicalAttribute?.height || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Weight</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Weight"
                  value={physicalAttribute?.weight || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Body Type</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Body Type"
                  value={physicalAttribute?.bodyType || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Hair Color</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Hair Color"
                  value={physicalAttribute?.hairColor || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Hair Length</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Hair Length"
                  value={physicalAttribute?.hairLength || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Eye Color</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Eye Color"
                  value={physicalAttribute?.eyeColor || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Skin Tone</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Skin Tone"
                  value={physicalAttribute?.skinTone || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Facial Hair</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Facial Hair"
                  value={physicalAttribute?.facialHair || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Tattoos</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Tattoos"
                  value={physicalAttribute?.tattoos ? "Yes" : "No"}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Piercings</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Piercings"
                  value={physicalAttribute?.piercings || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Distinct Features</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Distinct Features"
                  value={physicalAttribute?.distinctFeatures || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Shoe Size</label>
                <input
                  className="contact-us-input"
                  type="number"
                  placeholder="Shoe Size"
                  value={physicalAttribute?.shoeSize || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Clothing Size</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Clothing Size"
                  value={physicalAttribute?.clothingSize || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Build</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Build"
                  value={physicalAttribute?.build || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Voice Type</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Voice Type"
                  value={physicalAttribute?.voiceType || ""}
                  readOnly
                />
              </div>
            </>
          )
        }

        {
          activeSection === "Social Media Accounts" && (
            <>

              {/* Social Media Accounts Form */}
              {socialMediaAccounts?.platforms?.map((platform, index) => {
                return (
                  <div className="contact-us-row" key={index}>
                    {/* Platform name as label */}
                    <label className="contact-us-label">{platform.platform}</label>
                    {/* Platform URL as value */}
                    <input
                      className="contact-us-input"
                      type="text"
                      placeholder={platform.platformName}
                      value={platform.url || ""}
                      readOnly
                    />
                  </div>
                );
              })}
            </>
          )
        }

        {
          activeSection === "Availability" && (
            <>
              {/* Availability Form */}

              <div className="contact-us-row">
                <label className="contact-us-label">Available Dates</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Available Dates"
                  value={availability?.availableDates ? new Date(availability.availableDates).toLocaleDateString() : ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Preferred Work Location</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Preferred Work Location"
                  value={availability?.preferredWorkLocation || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Availability for Workshops</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Availability for Workshops"
                  value={availability?.availabilityForWorkShops || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Work Type Preference</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Work Type Preference"
                  value={availability?.workTypePreference || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Contract Type</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Contract Type"
                  value={availability?.contractType || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Willingness to Travel</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Willingness to Travel"
                  value={availability?.willingnessToTravel || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Availability for Night Shoots</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Availability for Night Shoots"
                  value={availability?.availabilityForNightShoots ? "Yes" : "No"}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Long Term Commitment</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Long Term Commitment"
                  value={availability?.longTermCommitment || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Work Schedule Flexibility</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Work Schedule Flexibility"
                  value={availability?.workScheduleFlexibility || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Role Type Preference</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Role Type Preference"
                  value={availability?.roleTypePreference || ""}
                  readOnly
                />
              </div>
            </>
          )
        }

        {
          activeSection === "Additional Information" && (
            <>
              {/* Additional Information Form */}

              <div className="contact-us-row">
                <label className="contact-us-label">Portfolio and Work Sample</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Portfolio and Work Sample"
                  value={additionalInformation?.portFolioAndWorkSample || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">References</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="References"
                  value={additionalInformation?.references || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Social Media Research</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Social Media Research"
                  value={additionalInformation?.socialMediaResearch || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Equipment and Props Owned</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Equipment and Props Owned"
                  value={additionalInformation?.equipmentAndPropsOwned || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Special Requirements</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Special Requirements"
                  value={additionalInformation?.specialRequirements || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Medical Condition</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Medical Condition"
                  value={additionalInformation?.medicalCondition || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Career Goals</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Career Goals"
                  value={additionalInformation?.careerGoals || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Memberships and Affiliations</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Memberships and Affiliations"
                  value={additionalInformation?.membershipsAndAffiliations || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Hobbies and Interests</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Hobbies and Interests"
                  value={additionalInformation?.hobbiesAndInterests || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Public Speaking Experience</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Public Speaking Experience"
                  value={additionalInformation?.publicSpeakingExperience || ""}
                  readOnly
                />
              </div>

              <div className="contact-us-row">
                <label className="contact-us-label">Personal Transportation Availability</label>
                <input
                  className="contact-us-input"
                  type="text"
                  placeholder="Personal Transportation Availability"
                  value={additionalInformation?.personalTransportationAvailability || ""}
                  readOnly
                />
              </div>
            </>
          )
        }


      </form>
    </>
  )
};

export default ArtistInformation
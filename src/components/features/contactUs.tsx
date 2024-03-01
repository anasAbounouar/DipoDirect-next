// Import the Image component from Next.js
import Image from 'next/image';
// import styles from './ContactUs.module.css'; // Assuming you have CSS Modules set up
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';


const contactDetails = {
  color: '#FFF',
  fontSize: '19.389px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: 'normal',
};

const ContactUs = () => {
  return (
    <div
      id="contact"
      className="bg-myBrand flex-1 flex items-center justify-center flex-col md:flex-row py-7 lg:gap-20"
    >
      {/* Use Next.js Image component for optimized images */}
      <Image
        className="w-[342.656px]"
        src="/assets/contactus.png"
        alt="Contact Us"
        width={342.656} // Specify width
        height={200} // Specify an appropriate height based on your image's aspect ratio
        objectFit="contain" // Adjust according to your needs
      />
      <div className="flex justify-center">
        <div className="info block">
        <ContactItem
  icon={faLocationDot}
  text="Casablanca Prince"
  style={contactDetails}
/>
<ContactItem
  icon={faPhone}
  text="067508371"
  style={contactDetails}
/>
<ContactItem
  icon={faEnvelope} // Use faEnvelope for the solid version
  text="dipoDirect@gmail.com"
  style={contactDetails}
/>

        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, text, style }) => (
    <>
      <div className="flex items-center">
        {/* Using the size prop to make the icon smaller */}
        <FontAwesomeIcon height={25}  icon={icon} style={{ fontSize: '16px' }} className="text-myIndigo items-center justify-center m-0 p-0" />
        <p className="ml-3 p-2 text-white" style={style}>
          {text}
        </p>
      </div>
    </>
  );
  

export default ContactUs;

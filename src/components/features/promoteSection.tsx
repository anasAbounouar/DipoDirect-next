// PromoteSection component displays a promotional section with a title, description,
// and a list of steps with images and descriptions.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHandshake,
    faTachometerAlt,
    faSmileBeam,
} from '@fortawesome/free-solid-svg-icons'
const PromoteSection = () => {
    return (
        // Section with top and bottom padding
        <section id="promote" className={`py-5 `}>
            {/* Title container */}
            <div className="flex justify-center">
                {/* Title with custom brand text color, font size, and padding */}
                <h2 className="text-myBrand text-3xl p-3">
                    شري بالرباح ونت مرتاح
                </h2>
            </div>

            {/* Description container */}
            <div className="flex justify-center my-6 w-full">
                {/* Description paragraph with center text alignment and padding */}
                <p className="w-10/12 md:w-9/12 text-center speech text-black text-lg py-4">
                    DipotDirect vous permet de mettre fin aux longues files
                    d'attente, aux déplacements coûteux et à la fatigue.
                </p>
            </div>

            {/* Steps container */}
            <div className="container mx-auto pb-4">
                <div className="flex flex-wrap flex-row mt-5 mb-4 gap-4 justify-center">
                    {/* Map through an array to create 3 step items */}
                    {Array.from({ length: 3 }, (_, index) => (
                        <div
                            className="w-full lg:w-1/4 mx-3 mt-3 gap-4"
                            key={index}
                        >
                            <div className={`flex items-center flex-row`}>
                                {/* Icon container */}
                                <div className="flex w-1/3 justify-center items-center relative">
                                    {/* Colored circle background */}
                                    <div className="bg-myDarkBlue h-[100px] w-[100px] rounded-full flex items-center justify-center">
                                        {/* Image inside the circle */}
                                        <img
                                            src={getImagePath(index)}
                                            alt={`Step ${index + 1}`}
                                            className="absolute"
                                        />
                                    </div>
                                </div>

                                {/* Step description container */}
                                <div
                                    className={`flex w-2/3 items-center justify-start flex-col ml-3`}
                                >
                                    {/* Step title with left alignment and brand color */}
                                    <span className="text-left w-full text-myBrand font-bold text-xl pb-2">
                                        {getStepTitle(index)}
                                    </span>
                                    {/* Step description with left alignment */}
                                    <p className="m-0 w-full text-left">
                                        {getStepDescription(index)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call-to-action container */}
            <div className="flex mt-5 items-center justify-center bg-blue-500 p-6">
                <div className="m-0 px-2.5 py-1 text-white text-xl flex flex-wrap">
                    <strong>Simple</strong>
                    <FontAwesomeIcon
                        icon={faHandshake}
                        className="text-myNavyBlue mx-2"
                        style={{ fontSize: '30px' }}
                    />
                    <strong>rapide</strong>
                    <FontAwesomeIcon
                        icon={faTachometerAlt}
                        className="text-myNavyBlue mx-2"
                        style={{ fontSize: '30px' }}
                    />
                    et sans frais supplementaires
                    <FontAwesomeIcon
                        icon={faSmileBeam}
                        className="text-myNavyBlue mx-2"
                        style={{ fontSize: '30px' }}
                    />
                </div>
            </div>
        </section>
    )
}

// Helper function to get the image path based on the step index
function getImagePath(index) {
    switch (index) {
        case 0:
            return '/assets/ci-list-checklist.svg'
        case 1:
            return '/assets/truck.svg'
        case 2:
            return '/assets/smile.svg'
        default:
            return ''
    }
}

// Helper function to get the step title based on the step index
function getStepTitle(index) {
    switch (index) {
        case 0:
            return '1. Choisir'
        case 1:
            return '2. Suivi transport'
        case 2:
            return '3. Recevoir'
        default:
            return ''
    }
}

// Helper function to get the step description based on the step index
function getStepDescription(index) {
    switch (index) {
        case 0:
            return "Choisir les fournitures d'une librairie"
        case 1:
            return 'Suivez votre marchandise .'
        case 2:
            return 'Recevez votre marchandise en toute sécurité'
        default:
            return ''
    }
}

export default PromoteSection

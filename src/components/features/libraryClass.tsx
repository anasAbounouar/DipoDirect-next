// Define the type for the box prop expected by the component
import dynamic from 'next/dynamic'
interface Box {
    id: number
    name: string
    description: string
    btn: string
    imgSrc: string
    pageSrc: string
}
import MyButton from '@/components/common/myButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

// Define the props expected by the LibraryClass component
interface LibraryClassProps {
    box: Box
    goToPage: (pageSrc: string) => void //  goToPage takes a string and returns void
}

export default function LibraryClass({ box, goToPage }: LibraryClassProps) {
    // Function to handle key down events for accessibility
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            goToPage(box.pageSrc)
        }
    }

    const getButtonColor = (name: string) => {
        switch (name) {
            case 'Écriture':
                return 'bg-myIndigo'
            case 'Papeterie':
                return 'bg-myBrand'
            case 'Organisation':
                return 'bg-myTealBlue'
            default:
                return ''
        }
    }

    return (
        <div
            tabIndex={0} // Make the div focusable
            onClick={() => goToPage(box.pageSrc)}
            onKeyDown={handleKeyDown}
            role="button" // Semantically identify the div as a button
            aria-pressed="false" // ARIA state for button
            className="focus:outline-none flex flex-col justify-center relative p-3 w-full lg:w-1/3 items-center" // Remove default focus outline, replace with your own styling if needed
        >
            <div className="flex w-fit items-center justify-center relative">
                <div
                    className={`absolute  w-full h-full bg-black opacity-40  left-0 inset-0`}
                ></div>
                <Image
                    src={box.imgSrc}
                    alt={`Image representing ${box.name}`} // Descriptive alt text for screen readers
                    className=" "
                    width={300}
                    height={300}
                />
                <p
                    className="mt-3 absolute top-4 text-white px-2 font-[400] mx-3 "
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.75)' }}
                >
                    {box.description}
                </p>
            </div>
            {/* <h5 className={`mt-3 ${getColorClass(box.name)}`}>{box.name}</h5> */}

            <div className="relative ">
                <MyButton
                    className={`${getButtonColor(
                        box.name
                    )} text-white   absolute bottom-0  left-1/2 transform -translate-y-1/2 -translate-x-1/2`} // Corrected the translate utility classes
                    onClick={() => goToPage(box.pageSrc)}
                    ariaLabel={`Choose ${box.name} `} // Assuming you have an ariaLabel prop for accessibility
                    text={box.btn}
                    height="30"
                    icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                />
            </div>
        </div>
    )
}

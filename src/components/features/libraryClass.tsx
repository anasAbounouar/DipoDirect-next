// Define the type for the box prop expected by the component
import dynamic from "next/dynamic";
interface Box {
  id: number;
  name: string;
  description: string;
  btn: string;
  imgSrc: string;
  pageSrc: string;
}
import MyButton from "@/components/common/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useState } from "react";

// Define the props expected by the LibraryClass component
interface LibraryClassProps {
  box: Box;
  goToPage: (pageSrc: string) => void; //  goToPage takes a string and returns void
}

export default function LibraryClass({ box, goToPage }: LibraryClassProps) {
  // Function to handle key down events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      goToPage(box.pageSrc);
    }
  };
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const getButtonColor = (name: string) => {
    switch (name) {
      case "Écriture":
        return "bg-myIndigo";
      case "Papeterie":
        return "bg-myBrand";
      case "Organisation":
        return "bg-myTealBlue";
      default:
        return "";
    }
  };

  return (
    <div
      tabIndex={0} // Make the div focusable
      onClick={() => {
        setIsLoading(true);
        goToPage(box.pageSrc);
      }}
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
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.75)" }}
        >
          {box.description}
        </p>
      </div>
      {/* <h5 className={`mt-3 ${getColorClass(box.name)}`}>{box.name}</h5> */}

      <div className="relative ">
        <MyButton
          className={`${getButtonColor(box.name)} text-white absolute bottom-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}
          onClick={() => {
            setIsLoading(true);
            goToPage(box.pageSrc);
          }}
          ariaLabel={`Choose ${box.name}`}
          text={isLoading ? "Loading" : box.btn} // Change text based on loading state
          height="30"
          icon={
            !isLoading ? (
              <FontAwesomeIcon icon={faRightFromBracket} />
            ) : undefined
          } // Hide icon when loading
          isLoading={isLoading} // Pass isLoading state
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}

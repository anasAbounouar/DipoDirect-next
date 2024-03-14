'use client';
import { useUser } from '@clerk/nextjs';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Corrected from 'next/navigation' to 'next/router'
import { useEffect, useState } from 'react';

const AdditionalInfoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser(); // This provides the current user's information
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const router = useRouter();

  const [additionalInfo, setAdditionalInfo] = useState<any>({
    firstName: '',
    lastName: '',
    libraryName: '', // Changed from 'bookstoreName' to match form input
    libraryCity: '', // New state to capture the selected city
    phoneNumber: '',
  });

  // Handle input change including dropdown
  const handleChange = (e) => {
    setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });
  };

  // Handle dropdown change
  const handleDropdownChange = (city) => {
    console.log(city);
    setAdditionalInfo({ ...additionalInfo, libraryCity: city });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (user) {
      try {
        await user.update({ unsafeMetadata: additionalInfo });
        toast.success(
          'Les Informations supplémentaires ont été enregistrées avec succès!',
        ); // Success toast
        router.push('/'); // Redirect or handle success state as needed
      } catch (error) {
        console.error('Failed to save additional information', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('User is not signed in.');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const AcmeLogo = () => (
    <>
      <Image
        src="/assets/logo.png"
        alt="Acme logo"
        width={100}
        height={50}
        className="rounded-lg"
      />
      <span className="self-center text-xl font-semibold whitespace-nowrap text-myBrand hover:text-blue-400 delay-100"></span>
    </>
  );

  useEffect(() => {
    setAdditionalInfo({
      firstName: user?.unsafeMetadata?.firstName || '',
      lastName: user?.unsafeMetadata?.lastName || '',
      libraryName: user?.unsafeMetadata?.libraryName || '',
      libraryCity: user?.unsafeMetadata?.libraryCity || '',
      phoneNumber: user?.unsafeMetadata?.phoneNumber || '',
    });
  }, [user]);
  return (
    <>
      <section className="flex items-center justify-center flex-col py-8">
        <div className="flex flex-col items-center justify-center">
          <AcmeLogo />
          <span className="my-3">Veuillez enter ces details</span>
        </div>
        <form
          className="max-w-[300px] gap-3 flex flex-row flex-wrap"
          onSubmit={handleSubmit}
        >
          {/* Email input (readonly) */}
          <Input
            isReadOnly
            type="email"
            placeholder={userEmail}
            defaultValue={userEmail}
            className="max-w-xs"
            color="default"
          />
          {/* Other form inputs */}
          <Input
            variant="bordered"
            className="m-0"
            type="text"
            name="firstName"
            value={additionalInfo.firstName}
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <Input
            variant="bordered"
            className="m-0"
            type="text"
            value={additionalInfo.lastName}
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <Input
            variant="bordered"
            className="m-0"
            type="text"
            value={additionalInfo.libraryName}
            name="libraryName"
            placeholder="Library Name"
            onChange={handleChange}
            required
          />
          <div className="w-full">
            <Dropdown>
              <DropdownTrigger>
                <Button className="w-full" variant="bordered">
                  {additionalInfo.libraryCity ||
                    'Choisir la ville de votre librairie'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Library city selection">
                {['Casablanca', 'Rabat', 'Benguerir', 'Tanger'].map((city) => (
                  <DropdownItem
                    key={city}
                    onClick={() => handleDropdownChange(city)}
                  >
                    {city}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Input
            variant="bordered"
            className="m-0"
            value={additionalInfo.phoneNumber}
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <Button
            className="bg-myBrand text-white w-full"
            type="submit"
            disabled={isLoading}
          >
            Enregistrer
          </Button>
        </form>
      </section>
    </>
  );
};

export default AdditionalInfoForm;

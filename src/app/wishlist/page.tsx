'use client';
import WishlistCard from '@/components/features/wishlistCard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function WishlistPage() {
  const [selectedOption, setSelectedOption] = useState('Tous les fournisseurs');
  const [loading, setLoading] = useState(false);

  // Options for the dropdown component
  const options = [
    { id: 0, value: 'Tous les fournisseurs', label: 'Tous les fournisseurs' },
    { id: 1, value: 'arrissala', label: 'Arrissala' },
    { id: 2, value: 'aladnane', label: 'Aladnane' },
    // ... add more options as needed
  ];

  const handleSelect = (optionValue) => {
    setLoading(true);
    setSelectedOption(optionValue);
    setLoading(false); // Assuming filtering is quick and no external calls are made
  };

  const wishlist = useSelector((state: RootState) => state?.cart?.wishlist);
  let libraries = [];

  for (let library in useSelector(
    (state: RootState) => state?.cart?.libraries,
  )) {
    libraries.push(library);
  }
  const categories = useSelector((state: RootState) => state?.cart.categories);

  return (
    <section className="p-2">
      <div className="text-center w-fit mx-auto   my-10 flex flex-row justify-center items-baseline border-b-2 border-myHeartColor ">
        <FontAwesomeIcon
          className="text-myHeartColor"
          icon={faHeart}
          fontSize={20}
        />
        <h2 className="ml-2 text-2xl ">Wishlist </h2>
      </div>
      <div className="text-center my-4">
        <Dropdown className=" min-w-[300px] rounded-lg w-full ">
          <DropdownTrigger className="rounded-lg bg-white min-w-[300px] ">
            <Button variant="bordered" className="min-w-[300px]">
              {selectedOption}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="choix du librairie">
            {options.map((option) => (
              <DropdownItem
                style={{ width: '100%' }}
                key={option.id}
                onClick={() => {
                  handleSelect(option.value);
                }}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="myGrid ">
        {
          // Conditionally render based on the selected option
          libraries
            .filter(
              (library) =>
                selectedOption === 'Tous les fournisseurs' ||
                library === selectedOption,
            )
            .map((library) =>
              categories.map((category) =>
                wishlist[library][category]?.map((item, index) => (
                  <WishlistCard
                    key={index}
                    item={item}
                    chosenLibrary={library}
                    type={category}
                  />
                )),
              ),
            )
        }
      </div>
    </section>
  );
}

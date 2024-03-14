'use client';

import { useCartItems } from '@/hooks/useCartItems';
import { getTotalPriceInCart } from '@/utils/cartUtils';
import { useUser } from '@clerk/nextjs';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Payment() {
  const [isSameClient, setIsSameClient] = useState(true);

  // Change this function as per your toggle handling
  const handleToggle = () => {
    setIsSameClient((prev) => !prev);
  };
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { supplier } = useCartItems(cart);
  const { user } = useUser(); // This provides the current user's information
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const [additionalInfo, setAdditionalInfo] = useState<any>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    libraryCity: '',
    libraryName: '',
  });

  useEffect(() => {
    setAdditionalInfo({
      firstName: user?.unsafeMetadata?.firstName,
      lastName: user?.unsafeMetadata?.lastName,
      phoneNumber: user?.unsafeMetadata?.phoneNumber,
      libraryCity: user?.unsafeMetadata?.libraryCity,
      libraryName: user?.unsafeMetadata?.libraryName,
    });
  }, [user?.emailAddresses?.[0]?.emailAddress]);

  const modes = [
    { key: 'surPlace', label: 'Sur Place' },
    { key: 'Livraison', label: 'Livraison' },
  ];

  const [selectedMode, setSelectedMode] = useState<string>('Choisir');

  const handleMode = (newSelectedMode: string) => {
    setSelectedMode(newSelectedMode);
  };
  const totalPrice = useMemo(() => getTotalPriceInCart(cart), [cart]);

  return (
    <div className="p-6">
      <div className="p-3 text-center">
        <span className="text-lg  ">Fournisseur</span> :{' '}
        <strong className="mx-1 capitalize text-lg"> {supplier}</strong>
      </div>
      <div className="flex flex-col lg:flex-row mx-4 lg:mx-11 justify-around  items-baseline lg:items-center">
        <ul className="text-xs flex flex-row items-center justify-center py-3">
          <li className="mr-1 mb-1 ">
            <FontAwesomeIcon className="text-myBrand" icon={faLocationDot} />
          </li>
          <li>153 Bd Moulay Idriss I, Casablanca 20250</li>
        </ul>
        <ul className="text-xs flex flex-row items-center justify-center py-3">
          <li className="mr-1 ">
            <FontAwesomeIcon className="text-myBrand" icon={faPhone} />
          </li>
          <li>(+212) 675058820</li>
        </ul>
        <ul className="text-xs flex flex-row items-center justify-center py-3">
          <li className="mr-1 ">
            <FontAwesomeIcon className="text-myBrand" icon={faEnvelope} />
          </li>
          <li>arrissala@gmail.com</li>
        </ul>
      </div>
      <div className="flex flex-col  items-center lg:items-start justify-between mx-4 lg:mx-11 my-4">
        <div className="text-sm">
          Vous n'êtes pas prêt à passer à la caisse ?{' '}
          <Link className="underline hover:text-myBrand" href={`/${supplier}`}>
            Poursuivez vos achats
          </Link>
          .
        </div>
      </div>
      <div className="flex flex-col">
        <div className=" flex mt-7 w-full  ml-auto flex-row items-end gap-2 sm:justify-center md:justify-end">
          <div className="mb-2">Mode de Récupération</div>
          <Dropdown>
            <DropdownTrigger>
              <Button className="min-w-[150px]" variant="bordered">
                {selectedMode}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Choisir mode de récupération">
              {modes.map((mode) => (
                <DropdownItem
                  key={mode.key}
                  onClick={() => handleMode(mode.label)}
                >
                  {mode.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <span
          style={{
            opacity: selectedMode === 'Sur Place' ? 1 : 0,
            transition: 'opacity 500ms ease-in-out',
          }}
          className={`text-myTextSlateGray mt-6 ${selectedMode === 'Sur Place' ? 1 : 0} transition-all duration-300 `}
        >
          Apres recevoir une notification indiquant que la commande est prete ,
          veuillez vous presentez au fournisseur avec votre recu{' '}
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-baseline justify-around">
        <form className="w-[80%] mx-auto my-8 gap-3 flex flex-col md:flex-row flex-wrap">
          <h6 className="font-bold text-center m-auto text-lg">
            Informations du client
          </h6>
          <div className="flex flex-col mt-3 gap-3 w-full flex-wrap justify-between items-center">
            <Input
              isReadOnly
              disabled
              key={'first-name'}
              type="text"
              label="Prénom"
              labelPlacement="inside"
              value={additionalInfo.firstName}
              className="md:w-5/12 min-w-[300px]"
            />
            <Input
              isReadOnly
              disabled
              key={'last-name'}
              type="text"
              label="Nom"
              labelPlacement="inside"
              value={additionalInfo.lastName}
              className="md:w-5/12 min-w-[300px]"
            />
            <Input
              isReadOnly
              disabled
              key={'library-name'}
              type="text"
              label="Nom de votre librairie"
              labelPlacement="inside"
              value={additionalInfo.libraryName}
              className="md:w-5/12 min-w-[300px]"
            />
            <Input
              isReadOnly
              disabled
              key={'phone-number'}
              type="text"
              label="Numéro de téléphone"
              labelPlacement="inside"
              value={additionalInfo.phoneNumber}
              className="md:w-5/12 min-w-[300px]"
            />
            <Input
              isReadOnly
              disabled
              key={'email'}
              type="text"
              label="Email"
              labelPlacement="inside"
              value={userEmail}
              className="md:w-5/12 min-w-[300px]"
            />
          </div>
        </form>

        <div className=" mx-auto p-6 bg-white shadow-md rounded">
          <h2 className="text-lg font-semibold mb-4">
            Informations de Récupérateur
          </h2>
          <div className="flex flex-col items-center justify-between mb-8">
            <span className="w-full">
              Personne autorisée à récupérer la colie :
            </span>

            <div className="flex mt-6 w-full items-center justify-between">
              <span className="ml-2">Autre</span>

              <label
                htmlFor="toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="toggle"
                  className="sr-only peer"
                  checked={isSameClient}
                  onChange={() => handleToggle()}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
              <span className="mr-2">Même Client</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Total</h3>
            <div className="text-3xl font-bold mb-2">{totalPrice} MAD</div>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t-2 border-dashed"></div>
            <div className="mx-4 text-sm uppercase">Paiement</div>
            <div className="flex-1 border-t-2 border-dashed"></div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg  mb-2">Détails de paiement</h3>
            <div className="grid gap-4 mb-4">
              <input
                type="text"
                placeholder="Nom du titulaire de la carte"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Numéro de carte"
                className="border p-2 rounded"
              />
              <div className="grid grid-cols-3 gap-4">
                <select className="border p-2 rounded">
                  <option>Mois</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {(i + 1).toString().padStart(2, '0')} -{' '}
                      {new Date(0, i).toLocaleString('fr-FR', {
                        month: 'long',
                      })}
                    </option>
                  ))}
                </select>
                <select className="border p-2 rounded">
                  <option>Année</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={i} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  placeholder="CVC"
                  className="border p-2 rounded"
                />
              </div>
            </div>
            <label
              htmlFor="save-card"
              className="flex items-center mb-4 cursor-pointer"
            >
              <input type="checkbox" id="save-card" className="mr-2" />
              <span>Enregistrer la carte pour les paiements futurs</span>
            </label>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Payer par carte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { libraryDatas } from './libraryDatas'; // Adjust the path as needed
import LibraryClass from '@/components/features/libraryClass';
import Image from 'next/image';
import styled from 'styled-components';
// import styles from './LibraryIntro.module.scss'
// import LibraryClass from '../../components/features/LibraryClass/LibraryClass'

export default function LibraryIntro() {
  const router = useRouter();
  const params = useParams();
  const chosenLibrary = params.library; // Assuming your dynamic path is [chosenLibrary]
  const [libraryData, setLibraryData] = useState<any>({});

  useEffect(() => {
    if (libraryDatas) {
      const library = libraryDatas.find(
        (ele) => ele.libraryName === chosenLibrary,
      );
      if (library) {
        setLibraryData(library);
      } else {
        notFound();
      }
    }
  }, [chosenLibrary]);

  const goToPage = (value: string) => {
    router.push(`/arrissala/${value}`); // Navigate programmatically
  };

  const Bienvenue = styled.section`
    height: 80dvh;
    .row {
      .library-name {
        color: var(--arrissala-color);
      }
    }
  `;

  return (
    <>
      <Bienvenue id="bienvenue" className={` p-4 flex justify-center relative`}>
        <Image
          src="/assets/library-home/image-1.png"
          alt="library Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        {/* Overlay */}
        <div className="overlay absolute inset-0 "></div>

        {/* Container */}
        <div className="container h-full flex items-center justify-center">
          {/* Row */}
          <div className="w-full">
            {/* Column */}
            <div className="text-center">
              {/* Title */}
              <h3 className=" inline-block  text-white relative text-xl m font-bold text-center">
                Bienvenue dans votre librairie
                <br />
                {/* Dynamic library name with custom color */}
                <strong
                  style={{
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.75)',
                  }}
                  className="library-name my-3 underline inline-block text-[var(--arrissala-color)]"
                >
                  {libraryData?.libraryName} !
                </strong>
              </h3>
            </div>
          </div>
        </div>
      </Bienvenue>
      <section id="classification">
        <h4 className="m-4 py-4 text-xl font-[500] text-center">
          Veuillez choisir une classe de fournitures
        </h4>
        <div className="flex items-center justify-around flex-wrap flex-row my-6">
          {libraryData?.boxes?.map((box) => (
            <LibraryClass key={box.name} box={box} goToPage={goToPage} />
          ))}
        </div>
      </section>
    </>
  );
}

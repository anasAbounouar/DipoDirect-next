'use client'
import ContactUs from '@/components/features/contactUs'
// import Image from "next/image";
import ServiceDescription from '@/components/features/serviceDescription'
import { Suspense, useEffect, useRef, useState } from 'react'
// import Dropdown from "@/components/common/dropdown";

import {
    Dropdown,
    DropdownTrigger,
    Button,
    DropdownMenu,
    DropdownItem,
    Spinner,
} from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import PromoteSection from '@/components/features/promoteSection'
// import { Loading as Spinner } from '@nextui-org/react'

const MosqueSection = styled.section`
    position: relative;
    height: 80vh;
    width: 100%;
    margin-top: 0;
    overflow: hidden; // Prevents the image from overflowing the container
`

export default function Home() {
    const imageInput = useRef()

    const router = useRouter() // Use the useRouter hook
    const [selectedOption, setSelectedOption] = useState(
        '__choisir un fournisseur'
    )

    // State for the selected option in the select component
    //  const [selectedOption, setSelectedOption] = useState('');

    // Options for the select component
    const options = [
        { id: 1, value: 'arrissala', label: 'Arrissala' },
        { id: 2, value: 'aladnane', label: 'Aladnane' },
        // ... add more options as needed
    ]
    // Function to handle the selection change and navigate
    const [loading, setLoading] = useState(false)

    const handleSelect = (optionValue) => {
        setSelectedOption(optionValue)
        router.push(`/${optionValue}`) // Wait for router.push to complete
    }

    return (
        <main>
            <MosqueSection
                id="mosque"
                className={`relative p-4  flex items-center justify-center bg-cover bg-center`}
            >
                <Image
                    src="/assets/mosque2.svg"
                    alt="Mosque Background"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    quality={100}
                />
                <div className="overlay"></div>
                <div className="container relative">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10/12 mb-3 flex items-center justify-center">
                            <h3 className="text-white relative text-xl m font-bold text-center">
                                Acheter votre Fourniture en un seul click!
                            </h3>
                        </div>
                        <div className="w-8/12 flex items-center justify-center">
                            {/* Use the SelectComponent here */}
                            <form>
                                {loading ? (
                                    <Spinner
                                        size="lg"
                                        label="Loading"
                                        color="default"
                                        labelColor="foreground"
                                    />
                                ) : (
                                    <Dropdown className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] rounded-lg">
                                        <DropdownTrigger className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] rounded-lg bg-white">
                                            <Button
                                                variant="bordered"
                                                className="w-full"
                                            >
                                                {selectedOption}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="choix du librairie"
                                            className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]"
                                        >
                                            {options.map((option) => (
                                                <DropdownItem
                                                    key={option.id}
                                                    onClick={() => {
                                                        handleSelect(
                                                            option.value
                                                        )
                                                        setLoading(true)
                                                    }}
                                                >
                                                    {option.label}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                {/* ... other content ... */}
            </MosqueSection>
            <PromoteSection />
            <ServiceDescription />
            <ContactUs />
        </main>
    )
}

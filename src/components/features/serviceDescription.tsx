import AvisSection from './feedbackSection'
import Image from 'next/image'

export default function ServiceDescription() {
    return (
        <>
            <section className="flex flex-row px-5 mt-5 text-left items-center justify-around h-auto lg:h-dvh">
                <div className="hidden lg:flex lg:w-1/2 flex-row">
                    <div className="w-1/2 p-3">
                        <Image
                            src="/assets/architecture.svg"
                            alt="photo of pretty library"
                            width={223} // Set the desired width
                            height={372} // Set the desired height
                            layout="responsive" // This can be adjusted based on your layout needs
                        />
                    </div>
                    <div className="w-1/2">
                        <Image
                            src="/assets/play.svg"
                            alt="photo of a kid"
                            className="mt-5"
                            width={247} // Set the desired width
                            height={413} // Set the desired height
                            layout="responsive" // Adjust layout as needed
                        />
                    </div>
                </div>
                <div className="lg:w-1/3 p-3 ">
                    <header>
                        <p className="mb-2">Qui sommes-nous ?</p>
                        <h3 className="my-2 text-myBrand text-2xl font-bold">
                            FOURNITURES POUR LIBRAIRIES
                        </h3>
                        <h5 className="mb-2 text-myHeartColor font-[400]">
                            Lien librairie-fournisseur
                        </h5>
                    </header>
                    <span className="text-myTextSlateGray leading-8">
                        Chez DIPODIRECT, nous nous engageons à révolutionner le
                        processus d'approvisionnement des librairies en leur
                        offrant une plateforme en ligne pratique et efficace
                        pour l'achat de fournitures de leurs fournisseurs
                        préférés. Notre objectif est de simplifier et de
                        rationaliser ce processus, permettant ainsi aux
                        librairies de se concentrer sur leur activité
                        principale.
                    </span>
                </div>
            </section>
            <AvisSection />
        </>
    )
}

'use client'
import { NavLink } from '@/components/navlink'
import { Input } from '@nextui-org/react'

import { useCallback, useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import SelectComponent from '../../components/common/SelectComponent/SelectComponent';
import SideFilter from '@/components/features/sideFilter'
// import ItemCard from '../../components/features/ItemCard/ItemCard.tsx';
import { useReducer } from 'react'
// import LoadingIndicator from '../../components/common/LoadingIndicator/LoadingIndicator.js';
import { useMediaQuery } from 'react-responsive'
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
} from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
// import { addToCart, addToWishlist } from '../../data/CartManager.ts';
// Custom hook to determine if the device is mobile based on screen width
const useIsMobile = () => {
    const isMobileDevice = useMediaQuery({ maxWidth: 767 })
    return isMobileDevice
}
// Reducer function to manage the state of various filters and UI elements
function reducer(state, action) {
    switch (action.type) {
        case 'SELECT_LANGUAGE':
            return {
                ...state,
                selectedLanguage: action.payload,
                currentPage: 1,
            }
        case 'SELECT_BABY_LEVEL':
            return {
                ...state,
                selectedBabyLevel: action.payload,
                selectedPrimaryLevel: '',
                selectedMiddleSchoolLevel: '',
                selectedHighSchoolLevel: '',
                currentPage: 1,
            }
        case 'SELECT_PRIMARY_LEVEL':
            return {
                ...state,
                selectedPrimaryLevel: action.payload,
                selectedBabyLevel: '',
                selectedMiddleSchoolLevel: '',
                selectedHighSchoolLevel: '',
                currentPage: 1,
            }
        case 'SELECT_MIDDLE_SCHOOL_LEVEL':
            return {
                ...state,
                selectedMiddleSchoolLevel: action.payload,
                selectedBabyLevel: '',
                selectedPrimaryLevel: '',
                selectedHighSchoolLevel: '',
                currentPage: 1,
            }
        case 'SELECT_HIGH_SCHOOL_LEVEL':
            return {
                ...state,
                selectedHighSchoolLevel: action.payload,
                selectedBabyLevel: '',
                selectedPrimaryLevel: '',
                selectedMiddleSchoolLevel: '',
                currentPage: 1,
            }
        case 'INCREMENT_CURRENT_PAGE':
            return { ...state, currentPage: action.payload }
        case 'SEARCH_QUERY':
            return {
                ...state,
                searchBooksInput: action.payload,
                currentPage: 1,
            }
        default:
            return state
    }
}
const initialFilterState = {
    selectedLanguage: '0',
    selectedBabyLevel: '',
    selectedPrimaryLevel: '',
    selectedMiddleSchoolLevel: '',
    selectedHighSchoolLevel: '',
    // isSideBarActive: false,
    currentPage: 1,
    searchBooksInput: '',
}

//define levels
const babyLevels = ['Tout', 'Petite', 'Moyenne', 'Grande']
const primaryLevels = ['Tout', 'CP', 'CE1', 'CE2', 'CM1', 'CM2']
const middleSchoolLevels = ['Tout', '1ère année', '2ème année', '3ème année']
const highSchoolLevels = ['Tout', 'Tranc Commun', '1 Bac', '2 Bac']

const typeOptions = [
    { label: 'Ecriture', value: 'ecritures', id: 0 },
    {
        label: 'Organisation',
        value: 'organisation',
        id: 1,
    },
    {
        label: 'Papeterie',
        value: 'papeterie',
        id: 2,
    },
]

const itemsPerPage = 12 // Number of items to display per page
export default function Items({
    userShoppingSession,
    setUserShoppingSession,
    // isSideBarActive,
    // setIsSideBarActive,
    myLocalHost = 'localhost',
}) {
    const [isSideBarActive, setIsSideBarActive] = useState(false)
    const isMobile = useIsMobile()
    // const router.push = userouter.push()
    const router = useRouter()

    const params = useParams()
    const chosenLibrary = params.library
    const type = params.itemsClass

    const [state, dispatch] = useReducer(reducer, initialFilterState)

    // const toggleSidebar = () => {
    //   //activate and disactivate sidebar
    //   dispatch({ type: 'SIDE-BAR', payload: !isSideBarActive });
    // };
    // possibility to change {type}

    const [selectType, setSelectType] = useState<string | undefined>(type) // Set state with type

    useEffect(() => {
        // Update the selectType when the URL parameter changes
        setSelectType(type)
    }, [type]) // Dependency array to re-run this effect when 'type' changes
    //change the type
    const handleChange = (newType: string) => {
        // Construct the new path by replacing the last part of the URL
        const newPath = `/${chosenLibrary}/${newType}`
        router.push(newPath)
    }

    // Step 1: Set up the state
    const [itemsData, setItemsData] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const port = 3000
    const handleSearchChange = useCallback((e) => {
        dispatch({ type: 'SEARCH_QUERY', payload: e.target.value })
    }, [])
    useEffect(() => {
        setIsloading(true)
        // Step 2: Fetch the data
        fetch(
            `https://dipo-direct-api.onrender.com/api/supplies/${chosenLibrary}/${type}`
        )
            .then((response) => response.json())
            .then((data) => {
                // Step 3: Set the state
                setItemsData(data.books)
                setIsloading(false)
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
                alert('error')
                setIsloading(false) // An error occurred, stop loading
            })
    }, [type, port, myLocalHost]) // The empty array ensures this effect runs once when the component mounts

    function filterBySearchTerm() {
        if (!state.searchBooksInput) {
            return itemsData // No filter applied
        } else {
            const filtering = new RegExp(state.searchBooksInput, 'ig')
            return itemsData.filter((item) => item.title.match(filtering))
        }
    }
    const filterItemsByLevel = () => {
        // only papeterie have this type of filter
        if (type === 'papeterie') {
            // List all level selections in order of precedence
            const levelSelections = [
                state.selectedBabyLevel,
                state.selectedPrimaryLevel,
                state.selectedMiddleSchoolLevel,
                state.selectedHighSchoolLevel,
            ]

            // Find the first selected level that is not 'Tout'
            const selectedLevel =
                levelSelections.find((level) => level && level !== 'Tout') || ''

            // Filter items based on the selected level
            return selectedLevel
                ? itemsData.filter((book) => book.level === selectedLevel)
                : itemsData
        }
    }

    function filterItemsByLanguage() {
        // only papeterie have this type of filter
        // Deconstruct selectedLanguage for easier reference
        if (type === 'papeterie') {
            const { selectedLanguage } = state

            // Return all items if '0' is selected, else filter by the selected language
            return selectedLanguage === '0'
                ? itemsData
                : itemsData.filter((book) => book.langue === selectedLanguage)
        }
    }

    const finalFilter = () => {
        // Applies different filters based on the 'type' and combines them with search term filtering

        if (type === 'papeterie') {
            const itemsFilteredByLevel = filterItemsByLevel()
            const itemsFilteredByLanguage = filterItemsByLanguage()

            return filterBySearchTerm()?.filter(
                (item) =>
                    itemsFilteredByLevel?.includes(item) &&
                    itemsFilteredByLanguage?.includes(item)
            )
        } else {
            //other {type} than papeterie, get filtered only bye search term
            return filterBySearchTerm()
        }
    }

    // Calculate the start and end indices for the current page
    const startIndex = (state.currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const displayedItems = finalFilter()?.slice(startIndex, endIndex)

    const shouldShowPrev = state.currentPage > 1
    const shouldShowNext =
        state.currentPage < finalFilter()?.length / itemsPerPage
    //handle next page button
    const nextPage = () => {
        if (shouldShowNext)
            return dispatch({
                type: 'INCREMENT_CURRENT_PAGE',
                payload: state.currentPage + 1,
            })
    }
    //handle prev page button
    const prevPage = () => {
        if (shouldShowPrev) {
            return dispatch({
                type: 'INCREMENT_CURRENT_PAGE',
                payload: state.currentPage - 1,
            })
        }
    }
    // the sidebarFilter is availble only for papeterie , and underconditions
    const showFilter = () => {
        if (type === 'papeterie') {
            return !isMobile || (isMobile && isSideBarActive)
        }
        return false
    }
    // after sidebar is opened, scrolling should be disabled
    useEffect(() => {
        const rootElement = document.querySelector('body') // Correctly get the #root element
        if (!rootElement) return console.log('#root not found ')
        if (isSideBarActive) {
            document.body.classList.add('no-scroll')
            rootElement.classList.add('shadow-overlay') // Use the rootElement variable
        } else {
            document.body.classList.remove('no-scroll')
            rootElement.classList.remove('shadow-overlay') // Use the rootElement variable
        }

        // Clean up function
        return () => {
            document.body.classList.remove('no-scroll')
            rootElement.classList.remove('shadow-overlay') // Use the rootElement variable
        }
    }, [isSideBarActive]) // Only re-run the effect if isSideBarActive changes

    const addedToWishlist = (item) => {
        const bookIndex = userShoppingSession[chosenLibrary][
            type
        ].wishlistBooks.findIndex((book) => book.id === item.id)
        if (bookIndex !== -1) {
            return true
        }
        return false
    }
    const addedToCart = (item) => {
        const bookIndex = userShoppingSession[chosenLibrary][
            type
        ].purchasedBooks.findIndex((purchasedItem) => {
            return purchasedItem.book.id === item.id
        })
        if (bookIndex !== -1) {
            return true
        }
        return false
    }
    const goToItem = (itemId) => {
        router.push(`${itemId}`)
    }
    return (
        <section id="intern" className={`relative pb-4 bg-myContent `}>
            {showFilter() && (
                <SideFilter
                    babyLevels={babyLevels}
                    primaryLevels={primaryLevels}
                    middleSchoolLevels={middleSchoolLevels}
                    highSchoolLevels={highSchoolLevels}
                    selectedLanguage={state.selectedLanguage}
                    selectedBabyLevel={state.selectedBabyLevel}
                    selectedPrimaryLevel={state.selectedPrimaryLevel}
                    selectedMiddleSchoolLevel={state.selectedMiddleSchoolLevel}
                    selectedHighSchoolLevel={state.selectedHighSchoolLevel}
                    isSideBarActive={isSideBarActive}
                    setIsSideBarActive={setIsSideBarActive}
                    dispatch={dispatch}
                />
            )}

            <div
                id="libraryContent"
                className={` transition-all duration-700 ease-in-out
        } ${
            !showFilter()
                ? 'm-0'
                : isSideBarActive
                  ? ' lg:ml-sidebar-expanded '
                  : 'lg:ml-sidebar-collapsed'
        }`}
            >
                {/* Header section with navigation and type selection */}
                <div className="flex flex-row items-center justify-end flex-wrap ">
                    <div className="w-full lg:w-1/2 py-3 lg:py-0 text-center ">
                        <NavLink
                            href={`/library-intro/${chosenLibrary}`}
                            className="capitalize text-black hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                            aria-label={`go back  to ${chosenLibrary} library introduction`}
                        >
                            {chosenLibrary}
                        </NavLink>
                        {/* Use an aria-hidden arrow for visual users, but it's hidden from screen readers */}
                        <span aria-hidden="true" className="mx-2 ">
                            &gt;
                        </span>

                        <span className="text-gray-900  capitalize">
                            {type}
                        </span>
                    </div>
                    <div className="w-full lg:w-1/2 py-3 text-center">
                        <Dropdown className="w-[100%] lg:w-[300px] rounded-lg">
                            <DropdownTrigger className="w-[90%] lg:w-[300px] rounded-lg bg-white">
                                <Button
                                    variant="bordered"
                                    className="w-full text-[15px]"
                                >
                                    {type}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="choix du librairie"
                                className="w-[100%] lg:w-[300px]"
                            >
                                {typeOptions.map((option) => (
                                    <DropdownItem
                                        className=""
                                        key={option.id}
                                        onClick={() => {
                                            handleChange(option.value);
                                            console.log(option.value);
                                        }}
                                    >
                                        {option.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <form
                        action=""
                        className="w-full lg:w-1/2 flex items-center justify-center my-6 lg:my-0"
                    >
                        {/* <input
                            onChange={handleSearchChange}
                            className="w-[320px] border-myBrand rounded-md"
                            type="text"
                            placeholder="Cherchez votre livre ici"
                            aria-label="Search books" // Accessible label for the search input
                        /> */}
                        <Input
                            value={state.searchBooksInput}
                            onChange={handleSearchChange}
                            className="w-[320px] border-myBrand rounded-md"
                            key={'outside'}
                            type="text"
                            label="Chercher votre produit ici"
                            labelPlacement={'outside'}
                            aria-label="Search books"
                        />
                    </form>
                </div>
                <h5 className="max-w-[1500px] mx-auto flex my-3 flex-col md:flex-row ">
                    <p className="lg:text-left ml-6 flex-1">
                        Affichage de {startIndex}-
                        {displayedItems?.length + startIndex} sur
                        <strong className="mx-1">
                            {finalFilter()?.length}
                        </strong>{' '}
                        resultats
                    </p>

                    {finalFilter().length >= itemsPerPage && (
                        <div className="flex justify-end m-4">
                            <button
                                onClick={prevPage}
                                className="pagination-button"
                                disabled={!shouldShowPrev} // Disable if on the first page
                                aria-disabled={!shouldShowPrev} //imporve accessibility
                                aria-label="Load previous set of items"
                            >
                                <i
                                    className="fa-solid fa-arrow-right "
                                    aria-hidden="true"
                                ></i>
                                {/* Changed to arrow-left for prev */}
                            </button>

                            <button
                                onClick={nextPage}
                                className="pagination-button ml-2"
                                disabled={!shouldShowNext} // Disable if on the last page
                                aria-disabled={!shouldShowNext} //imporve accessibility
                                aria-label="Load next set of items"
                            >
                                <i
                                    className="fa-solid  fa-arrow-left"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    )}
                </h5>
                <section className="min-h-96">
                    {/* Conditional rendering based on isLoading */}
                    {isLoading ? (
                        <h1>
                            <Spinner
                                size="lg"
                                label="Loading"
                                color="default"
                                labelColor="foreground"
                            />
                        </h1>
                    ) : displayedItems.length === 0 ? (
                        <h2 className="font-bold text-xl mt-9">
                            Pas de Resulat qui correspond a votre recherche :/
                        </h2>
                    ) : (
                        <div className="mt-4 myGrid">
                            {displayedItems.map((item) => (
                                <p>testing {item.id}</p>
                                // <ItemCard
                                //     onClick={() => goToItem(item.id)}
                                //     key={item.id}
                                //     item={item}
                                //     heartIconClass={
                                //         addedToWishlist(item)
                                //             ? 'fa-solid'
                                //             : 'fa-regular'
                                //     }
                                //     addedToWishlist={addedToWishlist(item)}
                                //     addedToCart={addedToCart(item)}
                                //     onWishlistToggle={() => {
                                //         addToWishlist(
                                //             userShoppingSession,
                                //             setUserShoppingSession,
                                //             chosenLibrary,
                                //             type,
                                //             item
                                //         )
                                //     }}
                                //     onAddToCart={() => {
                                //         addToCart(
                                //             userShoppingSession,
                                //             setUserShoppingSession,
                                //             chosenLibrary,
                                //             type,
                                //             item,
                                //             1,
                                //             true
                                //         )
                                //         // Your logic to handle add to cart
                                //     }}
                                // />
                            ))}
                        </div>
                    )}
                </section>

                {finalFilter().length >= itemsPerPage && (
                    <div className="flex justify-end m-4">
                        <button
                            onClick={prevPage}
                            className="pagination-button"
                            disabled={!shouldShowPrev} // Disable if on the first page
                            aria-disabled={!shouldShowPrev} //imporve accessibility
                            aria-label="Load previous set of items"
                        >
                            <i
                                className="fa-solid fa-arrow-right "
                                aria-hidden="true"
                            ></i>
                            {/* Changed to arrow-left for prev */}
                        </button>

                        <button
                            onClick={nextPage}
                            className="pagination-button ml-2"
                            disabled={!shouldShowNext} // Disable if on the last page
                            aria-disabled={!shouldShowNext} //imporve accessibility
                            aria-label="Load next set of items"
                        >
                            <i
                                className="fa-solid  fa-arrow-left"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

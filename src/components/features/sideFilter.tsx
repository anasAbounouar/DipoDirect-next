import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'

const SideFilterComponent = styled.aside`
    .expanded {
        @media (max-width: 767px) {
            z-index: -1 !important;
            width: 0px !important;
        }
        @media (min-width: 768px) {
            width: 62px !important;
        }
        #language,
        #level {
            display: none !important;
        }
    }
    .notExpanded {
        @media (max-width: 767px) {
            z-index: 109 !important;
            width: 100% !important;
            display: block !important;
        }
        @media (min-width: 768px) {
            width: var(--sideFilter-width) !important;
        }
        #language,
        #level {
            display: block !important;
        }
    }
    :hover {
        .arrow-btn {
            color: white;
        }
    }
    padding: 10px;
    background-color: var(--my-brand-color) !important;
    .arrow-btn {
        background-color: var(--brand-color);
        right: -20px;
    }
    position: absolute;
    height: 100%;
    @media (min-width: 992px) {
        position: fixed;
        top: -30px;
        left: 0px;
        bottom: 0px;
        height: auto;
        overflow-y: auto;
        padding-top: 140px;
    }
    #level {
        select:focus {
            outline: none;
        }
        select {
            height: 35px;
            font-size: 13px;
            padding: 3px 10px;
            border: 2px solid #ccc;
            border-radius: 4px;
            margin-right: 10px;
            width: 90%;
            margin-left: 15px;
            option {
                border-top: 1px solid #ebebeb;
                font-weight: 40px;
                color: #5f6467;
            }
        }
    }
    h4 {
        color: var(--dark-color);
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 134.766%;
    }
    form.language {
        margin-top: 10px;
        margin-left: 20%;
        align-items: start;
        position: relative;
        div {
            display: flex;
            align-items: center;
            position: relative;
            padding: 10px;
            label {
                cursor: pointer;
                color: #fff;
                text-align: center;
                font-size: 15px;
                font-style: normal;
                font-weight: 400;
                line-height: 134.766%;
                &::before {
                    height: 20px;
                    width: 20px;
                    content: '';
                    position: absolute;
                    background: white;
                    border-radius: 100%;
                    margin-right: 10px;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                    // transition: 0.3s;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                &:hover {
                    color: yelow;
                }
            }

            input[type='radio'] {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
                /* Your custom styles */
                height: 20px;
                width: 20px;
                content: '';
                position: absolute;
                background: white;
                border-radius: 100%;
                margin-right: 10px;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            label {
                margin-left: 10px;
            }

            input[type='radio']:checked + label::before {
                background-color: yellow;
            }
        }
    }

    transition: 0.4s ease-in-out;
    &:hover {
        .hamburger {
            i {
                color: white;
            }
        }
    }
    .sidebarArrow {
        border: none;
        transition: 0.3s;
        z-index: 99;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        content: '<';
        height: 40px;
        width: 40px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 6px;
        i {
            transition: 0.3s;
        }
    }
`

function SideFilter({
    babyLevels,
    primaryLevels,
    middleSchoolLevels,
    highSchoolLevels,
    selectedLanguage,
    selectedBabyLevel,
    selectedPrimaryLevel,
    selectedMiddleSchoolLevel,
    selectedHighSchoolLevel,
    isSideBarActive,
    setIsSideBarActive,
    dispatch,
}) {
    // Use media query hook
    const isMobile = useMediaQuery({ maxWidth: 1024 })
    useEffect(() => {
        const handleResize = () => {
            const sideFilter = document.getElementById('sideFilter')
            const language = document.getElementById('language')
            const level = document.getElementById('level')

            if (!sideFilter || !language || !level)
                console.log('sidefilter/language/level is not found as id  ')
            else {
                if (!isSideBarActive) {
                    if (isMobile) {
                        sideFilter.style.display = 'none'
                    }

                    language.style.display = 'none'
                    level.style.display = 'none'
                } else if (isSideBarActive) {
                    language.style.display = 'block'
                    level.style.display = 'block'
                }
            }
        }

        // Add event listener for window resize
        window.addEventListener('resize', handleResize)

        // Initial call to handleResize to set styles when the component mounts
        handleResize()

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [isSideBarActive, isMobile])
    // A helper function to create a radio button
    const renderRadioButton = (id, value, checked, label) => (
        <>
            <input
                type="radio"
                id={id}
                name="language"
                value={value}
                checked={checked === value}
                onChange={() =>
                    dispatch({ type: 'SELECT_LANGUAGE', payload: value })
                }
                className="radio-button"
            />
            <label htmlFor={id}>{label}</label>
        </>
    )

    return (
        <SideFilterComponent
            id="sideFilter"
            className={`relative text-sm pt-0 ${
                isSideBarActive
                    ? 'z-50 w-full block lg:w-sidebar-expanded'
                    : 'z--1 w-0 lg:w-sidebar-collapsed'
            }`}
            {...(!isMobile && {
                onMouseEnter: () => setIsSideBarActive(true),
                onMouseLeave: () => setIsSideBarActive(false),
            })}
        >
            <div className="sidebarArrow" aria-hidden="true">
                <FontAwesomeIcon
                    icon={faAnglesRight}
                    className={`fa-solid ${
                        !isSideBarActive ? '' : 'transform rotate-180'
                    }`}
                />
            </div>
            <div id="language" className={` c-black text-[25px] font-[500]`}>
                <h6 className="text-center">Language</h6>
                <form
                    className="flex flex-col language    mt-3 ml-2 items-start relative"
                    name="filters"
                >
                    <div>
                        {renderRadioButton(
                            'tout',
                            '0',
                            selectedLanguage,
                            'Tout'
                        )}
                    </div>
                    <div>
                        {renderRadioButton(
                            'fr',
                            'fr',
                            selectedLanguage,
                            'Francais'
                        )}
                    </div>
                    <div>
                        {renderRadioButton(
                            'en',
                            'en',
                            selectedLanguage,
                            'Englais'
                        )}
                    </div>
                    <div>
                        {renderRadioButton(
                            'ar',
                            'ar',
                            selectedLanguage,
                            'Arabe'
                        )}
                    </div>
                </form>
            </div>

            <div id="level">
                <h6 className="text-lg font-medium mb-3 text-[25px] text-center">
                    Niveau
                </h6>

                <select
                    id="primaire"
                    value={selectedPrimaryLevel}
                    onChange={(e) =>
                        dispatch({
                            type: 'SELECT_PRIMARY_LEVEL',
                            payload: e.target.value,
                        })
                    }
                    className="w-full py-2 px-3 mb-3 border rounded-md"
                >
                    <option value="" disabled hidden>
                        __Primaire
                    </option>
                    {primaryLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
                <select
                    id="college"
                    value={selectedMiddleSchoolLevel}
                    onChange={(e) =>
                        dispatch({
                            type: 'SELECT_MIDDLE_SCHOOL_LEVEL',
                            payload: e.target.value,
                        })
                    }
                    className="w-full py-2 px-3 mb-3 border rounded-md"
                >
                    <option value="" disabled hidden>
                        __College
                    </option>
                    {middleSchoolLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
                <select
                    id="lycee"
                    value={selectedHighSchoolLevel}
                    onChange={(e) =>
                        dispatch({
                            type: 'SELECT_HIGH_SCHOOL_LEVEL',
                            payload: e.target.value,
                        })
                    }
                    className="w-full py-2 px-3 mb-3 border rounded-md"
                >
                    <option value="" disabled hidden>
                        __Lycee
                    </option>
                    {highSchoolLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>
        </SideFilterComponent>
    )
}

export default SideFilter

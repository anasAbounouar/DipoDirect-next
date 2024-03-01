'use client'
import { useEffect, useState } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';

const avisStyle = {
    position: 'relative',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginTop: '30px',
    marginBottom: '30px',
    
  };

  const boxStyle = {
    padding: '30px',
    borderRadius: '6px',
    marginBottom: '80px',
    small: {
      fontSize: '80%',
    },
    '> span': {
      textAlign: 'center',
      display: 'block',
    },
  };

  const commentStyle = {
    color: '#000',
    fontStyle: 'italic',
    lineHeight: '25px',
    minHeight: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    position: 'relative',
 
  };

  const quoteRightStyle = {
    position: 'absolute',
    right: '0px',
    bottom: '-13px',
    fontSize: '30px',
  };

  const quoteLeftStyle = {
    position: 'absolute',
    left: '0px',
    top: '-13px',
    fontSize: '30px',
  };


interface Avi {
  id: number;
  name: string;
  date: string;
  text: string;
}

export default function FeedbackSection() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 768 && screenWidth < 991) {
        setSlidesPerView(2);
      } else if (screenWidth <= 768) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const Avis = [
    {
      id: 1,
      name: 'Anas Abounouar',
      date: '2024-01-11',
      text: 'I like the service ! .',
    },
    {
      id: 2,
      name: 'Zakaria Fajir',
      date: '2023-14-23',
      text: "I don't need to travel anymore.",
    },
    {
      id: 3,
      name: 'adnane Bae',
      date: '2023-12-23',
      text: 'that was a special service .',
    },
    {
      id: 4,
      name: 'anas ab',
      date: '2023-12-23',
      text: 'that was a special service .',
    },
    // Add more reviews as needed
  ];

  return (
    <section id="avis" style={avisStyle}>
      <div  className="flex align-center justify-center mb-5 text-[30px] text-myBrand relative">
        <h2 className="underline py-2 flex">Avis</h2>
      </div>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
              cssMode={true} // Use Swiper's CSS mode
            
      >
        {Avis.map((avi) => (
          <SwiperSlide  style={boxStyle}key={avi.id} className={`p-10 col-10 text-center bg-mySoftBrand `}>
          <span>
              <h5 className="text-myBrand font-bold text-lg">{avi.name}</h5>
              <small>
                {avi.date}
                <span
                  aria-label="Rating: 5 out of 5 "
                  className="flex items-center justify-center py-3"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M6.11536 10.6327L9.03973 12.5523C9.57527 12.9041 10.2306 12.384 10.0897 11.7263L9.31455 8.11651L11.9007 5.6845C12.3728 5.24092 12.1191 4.39966 11.499 4.34612L8.09548 4.03256L6.76366 0.62162C6.52407 0.00214398 5.70666 0.00214398 5.46707 0.62162L4.13525 4.02491L0.73172 4.33848C0.111614 4.39201 -0.142066 5.23327 0.33006 5.67685L2.91618 8.10887L2.14105 11.7187C2.00012 12.3764 2.65546 12.8964 3.191 12.5446L6.11536 10.6327Z"
                        fill="#009688"
                      />
                    </svg>
                  ))}
                </span>
              </small>
            </span>

            <div className={` bg-mySoftGreen custom-shadow `}>
              <div   style={quoteLeftStyle}>
                <i
                  className="fa fa-quote-left text-myBrand"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="text p-3">{avi.text}</div>
              <div style={quoteRightStyle} >
                <i
                  className="fa fa-quote-right  text-myBrand"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

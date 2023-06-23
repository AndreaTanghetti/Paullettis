import React, { useState, useEffect } from 'react';
import './Carrousel.css';

const Carrousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagenes = [
    {
      image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/065/902/themes/idea/1-slide-1679057267828-3627803662-bb1ebc785bf1ec59ff75a8cb60fea2c21679057413-1920-1920.webp?1358284395',
    },
    {
      image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/065/902/themes/idea/1-slide-1679057267829-7438630414-686f3c96c8cc060c469be9729ccc0b151679057416-1920-1920.webp?1358284395',
    },
  ];

  useEffect(() => {
    const tiempo = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 5000);

    return () => clearInterval(tiempo);
  }, [imagenes.length]);

  const handlerSig = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const handlerAnt = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="carrousel">
      <button onClick={handlerAnt} className="ant"> &lt; </button>
      <img src={imagenes[activeIndex].image} alt={imagenes[activeIndex].caption} className="contenido" />
      <button onClick={handlerSig} className="sig">
        &gt;
      </button>
    </div>
  );
};

export default Carrousel;

import React, { useEffect, useState } from 'react';

import { 
  Container, 
  SliderStyled, 
  Wrapper,
  Heading,
  Title
} from './styles';

// import Img1 from '../../assets/images/gentra.jpg';
// import Img2 from '../../assets/images/gentra.jpg';
// import Img3 from '../../assets/images/Cobalt.psd2.png';
import Spinner from '../Spinner';

const BestSalesCarousel = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch data
  const url = 'https://admin.zauto.uz/api/bestsellercars';
  useEffect(() => {
    setLoading(true);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      console.log(data, 'data in fetch')
      setLoading(false);
      setError(error);
    }).catch((err) => {
      setLoading(false)
      setError('Fetch Failed!')
    })
  }, [url]);

  // settings
  const settings = {
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    centerMode: false,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  console.log(data, 'data in carousel')
    return (
      <Container>
        <Heading>Лучшие Продажи</Heading>
        <SliderStyled {...settings}>
        {
          !loading && data.length ? (data
              .filter((item, idx) => idx < 5)
              .map(({id, image, name}) => (
                <Wrapper id={id} key={id}>
                  <img src={`https://admin.zauto.uz/${image}`} alt='car'/>
                  <Title>{name}</Title>
                </Wrapper>
              ))
            ) : <Spinner />
        }
        </SliderStyled>
      </Container>
    );
  };

export default BestSalesCarousel;
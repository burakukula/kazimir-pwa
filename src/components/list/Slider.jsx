// @flow

import React, {useState} from 'react';
import classnames from 'classnames';

import Slide from './Slide';
import style from './slider.css';
import ArrowLeftIcon from '../navigationIcons/ArrowLeft';
import ArrowRightIcon from '../navigationIcons/ArrowRight';
import type {PhotoType} from '../../AppContainer';

type SliderPropsType = {
  items: Array<PhotoType>,
};

const Slider = ({items}: SliderPropsType) => {
  const [currentIndex, goToSlide] = useState(0);
  const goToNextSlide = () => goToSlide(currentIndex + 1);
  const goToPrevSlide = () => goToSlide(currentIndex - 1);

  const additionalStyles = {
    left: `-${currentIndex * 100}%`,
  };

  return (
    <div className={style.slider}>
      <div className={style.sliderWrapper} style={additionalStyles}>
        {items.map((item, index) => (
          <Slide key={index} item={item} />
        ))}
      </div>

      {currentIndex !== 0 && (
        <button
          onClick={goToPrevSlide} //eslint-disable-line
          className={classnames(
            style.sliderItemNavIcon,
            style.sliderItemNavIconLeft
          )}
        >
          <ArrowLeftIcon color="black" />
        </button>
      )}
      {currentIndex < items.length - 1 && (
        <button
          onClick={goToNextSlide} //eslint-disable-line
          className={classnames(
            style.sliderItemNavIcon,
            style.sliderItemNavIconRight
          )}
        >
          <ArrowRightIcon color="black" />
        </button>
      )}
    </div>
  );
};

export default Slider;

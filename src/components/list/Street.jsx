// @flow strict

import React from 'react';
// $FlowFixMe https://github.com/ReactTraining/react-router/issues/6944
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import cx from 'classnames';
import ArrowLeftIcon from '../navigationIcons/ArrowLeft';
import ArrowRightIcon from '../navigationIcons/ArrowRight';
import {slugifyStreetName} from '../../utils/url';

import type {RouterHistory} from 'react-router-dom';
import type {PlacesType} from '../../AppContainer';
import {getScreenType, SCREEN_MOBILE} from '../../utils/screenType';

import style from './list.css';
import {useI18n} from '../../utils/locale/I18n';

type PropsType = {
  name: string,
  id: number,
  mapView: boolean,
  places: PlacesType,
};

function Street({name, id, mapView, places}: PropsType) {
  const history = useHistory();
  const {generateRoute} = useI18n();
  const slugName = slugifyStreetName(name);
  const path = generateRoute('MAP', {name: slugName});
  const isActive = useRouteMatch(path);
  const canBeClicked = !(!mapView && getScreenType() === SCREEN_MOBILE);

  return (
    <div
      className={cx(style.listItem, `${style.listItem}-${id}`, {
        [`${style.listItemActive}`]: isActive,
      })}
    >
      <style>
        {`.${style.list} .${style.listItem}-${id} {
            background-image: url(${places.present[0].photos[0].small});
        }`}
      </style>
      <div
        className={style.listItemCover}
        onClick={() => canBeClicked ? history.push(path) : undefined}
      ></div>
      <Link
        to={generateRoute('STREET', {
          name: slugName,
          timespan: 'past',
        })}
        className={style.listItemNavIcon}
      >
        <ArrowLeftIcon color="white" />
      </Link>
      <h3 className={style.listItemName}>{name}</h3>
      <Link
        to={generateRoute('STREET', {
          name: slugName,
          timespan: 'present',
        })}
        className={style.listItemNavIcon}
      >
        <ArrowRightIcon color="white" />
      </Link>
    </div>
  );
}

export default Street;

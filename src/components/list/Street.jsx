// @flow

import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withLocale} from '../../utils/locale/withLocale';
// TODO set albsolute paths webpack :)
import type {LocalePropsType} from '../../utils/locale/LocaleContext';
import ArrowLeftIcon from '../navigationIcons/ArrowLeft';
import ArrowRightIcon from '../navigationIcons/ArrowRight';

import style from './list.css';

type PropsType = {} & LocalePropsType;

class Street extends React.Component<PropsType> {
  render() {
    const {name, id, mapView, match, history} = this.props;

    const itemBackgroundStylesList = {
      backgroundImage: `url(${this.props.places.present[0].photos[0].images.small})`,
      backgroundSize: '100%',
      backgroundPosition: 'center center',
      minHeight: '100px',
    };

    return (
      <div
        className={style.listItem}
        style={!mapView ? itemBackgroundStylesList : null}
      >
        <div
          className={style.listItemCover}
          onClick={mapView ? () => history.push(`/map/${id}`) : null}
        />
        <Link to={`/street/${id}/past`} className={style.listItemNavIcon}>
          <ArrowLeftIcon color="white" />
        </Link>
        <h3 className={style.listItemName}>{name}</h3>
        <Link to={`/street/${id}/present`} className={style.listItemNavIcon}>
          <ArrowRightIcon color="white" />
        </Link>
      </div>
    );
  }
}

export default withRouter(withLocale()(Street));

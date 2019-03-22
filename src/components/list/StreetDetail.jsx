// @flow

import * as React from 'react';
import {withRouter} from 'react-router';
import withProps from '../../utils/withProps';
import {withLocale} from '../../utils/locale/withLocale';

type StreetType = {
  details?: Array<any>,
  id?: number,
  photos?: Array<any>,
  updated_at?: string
};

type PropsType = {
  items?: Array<StreetType>,
  streetName: string
};

const StreetDetail = ({id, ...props}: PropsType) => ({
  render() {
    const {items, streetName, locale} = props;

    return (
      <React.Fragment>
        <h3>{streetName}</h3>
        {items.map((item, index) => (
          <div key={index}>
            <h4>{item.details[locale].name}</h4>
            <p>{item.details[locale].description}</p>
          </div>
        ))}
      </React.Fragment>
    );
  }
});

const mapPropsToNewProps = ({match, data, locale}) => ({
  items: data.find(item => item.id === ~~match.params.id).places[
    match.params.timespan
  ],
  streetName: data.find(item => item.id === ~~match.params.id).name,
  locale
});

export default withLocale()(
  withRouter(withProps(mapPropsToNewProps, StreetDetail))
);
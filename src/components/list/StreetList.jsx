// @flow

import * as React from 'react';
import {withLocale} from '../../utils/locale/withLocale';

import Street from './Street';
// TODO set albsolute paths webpack :)
import type {LocalePropsType} from '../../utils/locale/LocaleController';

type PropsType = {
  children?: React.Node
} & LocalePropsType;

const StreetList = ({data}: PropsType) => ({
  render() {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <Street key={index} {...item} />
        ))}
      </React.Fragment>
    );
  }
});

export default withLocale()(StreetList);

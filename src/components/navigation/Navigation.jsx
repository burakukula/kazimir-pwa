// @flow

import React, {useState} from 'react';
// $FlowFixMe https://github.com/ReactTraining/react-router/issues/6944
import {
  // $FlowFixMe
  useParams,
  // $FlowFixMe
  useHistory,
  // $FlowFixMe
  useRouteMatch,
  Link,
} from 'react-router-dom';
import cx from 'classnames';
import {getRouteFromLocation} from '../../utils/routes/router';
import style from './navigation.css';
import ListIcon from '../navigationIcons/ListIcon';
import MapIcon from '../navigationIcons/MapIcon';
import Info from '../navigationIcons/Info';
import ArrowLeft from '../navigationIcons/ArrowLeft';
import ArrowRight from '../navigationIcons/ArrowRight';
import Logo from '../navigationIcons/Logo';
import {useI18n} from '../../utils/locale/I18n';
import {slugifyStreetName} from '../../utils/url';
import type {StreetType} from '../../AppContainer';

function Navigation({data}: {data: Array<StreetType>}) {
  const {translate, locale, changeLocale, generateRoute, getRoute} = useI18n();
  const [opened, toggleOpen] = useState(false);

  const history = useHistory();
  const {name, timespan} = useParams();
  const isMapVisible = useRouteMatch(getRoute('MAP'));
  const isDetailVisible = useRouteMatch(getRoute('STREET'));
  const changeLocaleRoute = getRouteFromLocation(location.pathname, locale);

  const selectedItem = data.find(item => slugifyStreetName(item.name) === name);

  const handleToggleInfoMenu = () =>
    opened ? toggleOpen(false) : toggleOpen(true);

  const className = cx(
    style.navigationMainMobileSwitchIcon,
    style.navigationIconSvg,
    style.navigationIconOnRight
  );

  const linkClassName = cx(style.navigationLink, {
    [`${style.navigationLinkDetail}`]: isDetailVisible,
  });

  const infoLinks = (
    <>
      <a
        href="javascript:void(0)"
        onClick={() => {
          changeLocale(locale === 'pl' ? 'en' : 'pl');
          // todo: change this to redirect route in react-router
          history.push(changeLocaleRoute);
        }}
        className={linkClassName}
      >
        {locale === 'pl' ? '🇺🇸' : '🇵🇱'}
      </a>
      <Link to={generateRoute('INFO')} className={linkClassName}>
        {translate('INFO')}
      </Link>
      <Link to={generateRoute('TEAM')} className={linkClassName}>
        {translate('TEAM')}
      </Link>
      <Link to={generateRoute('PRESS')} className={linkClassName}>
        {translate('PRESS')}
      </Link>
    </>
  );

  return (
    <>
      <nav
        className={cx(style.navContainer, {
          [`${style.navContainerPresent}`]:
            isDetailVisible && timespan === 'present',
          [`${style.navContainerPast}`]: isDetailVisible && timespan === 'past',
        })}
      >
        {!isDetailVisible ? (
          <div className={style.logoContainer}>
            <Link to={generateRoute('MAIN')} className={style.navLogo}>
              <Logo />
            </Link>
            <div
              aria-label="info-button"
              onClick={handleToggleInfoMenu}
              className={cx(className, style.infoButton)}
            >
              <Info color="#424242" />
            </div>
          </div>
        ) : (
          selectedItem && (
            <div className={style.navigationLinksOnlyMobile}>
              <Link
                to={generateRoute('MAIN')}
                className={cx(style.navigationIcon, style.navigationIconSvg, {
                  [`${style.navigationIconOnLeft}`]:
                    isDetailVisible && timespan === 'present',
                  [`${style.navigationIconOnRight}`]:
                    isDetailVisible && timespan === 'past',
                })}
              >
                {isDetailVisible && timespan === 'present' ? (
                  <ArrowLeft color="#fff" />
                ) : (
                  <ArrowRight color="#fff" />
                )}
              </Link>
              <h3
                className={cx(
                  style.navigationLinkDetail,
                  style.streetNameHeadline
                )}
              >
                {selectedItem.name}
              </h3>
            </div>
          )
        )}

        {/* MOBILE */}
        <div className={style.navLinksMobileOnlyContainer}>
          <Link
            to={
              isMapVisible
                ? generateRoute('MAIN')
                : generateRoute('MAP', {name: 'miodowa'})
            }
            className={className}
            aria-label={
              isMapVisible ? 'Switch to list view' : 'Switch to map view'
            }
          >
            {!isDetailVisible &&
              (isMapVisible ? (
                <ListIcon color={isDetailVisible ? '#ffffff' : '#424242'} />
              ) : (
                <MapIcon color={isDetailVisible ? '#ffffff' : '#424242'} />
              ))}
          </Link>
        </div>

        {/* DESKTOP */}
        {isDetailVisible && selectedItem && (
          <div className={style.navigationLinksDesktop}>
            <Link
              to={generateRoute('MAIN')}
              className={cx(
                style.navigationIcon,
                style.navigationIconSvg,
                style.navigationIconOnLeft
              )}
            >
              <ArrowLeft color="#fff" />
            </Link>
            <h3
              className={cx(
                style.navigationLinkDetail,
                style.streetNameHeadline
              )}
            >
              {selectedItem.name}
            </h3>
          </div>
        )}

        <div className={style.navLinksContainer}>{infoLinks}</div>
      </nav>
      <div
        className={cx(style.navInfoLinksMobileOnly, {
          [`${style.navInfoLinksMobileOnlyActive}`]: opened,
        })}
      >
        {infoLinks}
      </div>
    </>
  );
}

export default Navigation;

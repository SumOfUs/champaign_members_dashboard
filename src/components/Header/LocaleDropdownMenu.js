import React from 'react';
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { changeLocale } from '../../store/actions';
import locales from '../../react-intl/locales/messages';
import { selectLocale } from '../../store/selectors';
import { createStructuredSelector } from 'reselect';

export const LocaleDropdownMenu = (props) => {
  return (
    <NavDropdown eventKey={4} title={locales[props.locale].label} id="basic-nav-dropdown">
      { Object.keys(locales).map((locale, i) => {
        return(<MenuItem key={i} onClick={() => props.changeLocale(locale)}>
          {locales[locale].label}
        </MenuItem>
        );
      })
     }
    </NavDropdown>
  );
};

const mapDispatchToProps = dispatch => ({
  changeLocale: (locale) => {
    return dispatch(changeLocale(locale))
  },
});

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleDropdownMenu);

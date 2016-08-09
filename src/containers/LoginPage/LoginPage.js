import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Field, SubmissionError, reduxForm } from 'redux-form/immutable';
import {
  Button,
  Checkbox,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { FieldComponent } from 'components/FormComponents/FieldComponent';

import {
  selectAuthToken,
  selectCurrentMember,
  selectLoading,
  selectError,
} from 'store/selectors';

import { login } from './actions';
import validate from './validate';
import styles from './LoginPage.css';

export class LoginPage extends Component {
  componentWillMount() {
    return this.redirectIfAuthenticated();
  }

  componentWillUpdate() {
    return this.redirectIfAuthenticated();
  }

  onSubmit = (data, dispatch) => {
    const credentials = data.toJS();
    return dispatch(login(credentials))
      .catch(error => {
        throw new SubmissionError(error);
      });
  }

  redirectIfAuthenticated() {
    if (this.props.token && this.props.member) {
      this.props.redirect('/');
    }
  }


  render() {
    const { handleSubmit } = this.props;

    if (this.props.token && this.props.member) {
      return (null);
    }

    return (
      <section id="login-page">
        <div className={styles.background}></div>
        <div className={`${styles.overlay} container`}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit(this.onSubmit)} className={styles.form}>
            <FormGroup controlId="loginEmail">
              <ControlLabel>Email</ControlLabel>
              <Field name="email" type="text" component={FieldComponent} />
            </FormGroup>

            <FormGroup controlId="loginPassword">
              <ControlLabel>Password</ControlLabel>
              <Field name="password" type="password" component={FieldComponent} />
              <FormControl.Feedback />
            </FormGroup>

            <Checkbox>Remember me</Checkbox>

            <Button type="submit">Log in</Button>
          </form>
        </div>
      </section>
    );
  }
}

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.object,
  token: PropTypes.string,
  member: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectAuthToken(),
  member: selectCurrentMember(),
  loading: selectLoading(),
  error: selectError(),
});

const mapDispatchToProps = dispatch => ({
  redirect: url => dispatch(push(url)),
  dispatch,
});

export default reduxForm({ form: 'login', validate })(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);

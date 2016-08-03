import React, { Component, PropTypes } from 'react';
import styles from './LoginForm.css';
import {
  Button,
  Checkbox,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';


const FieldComponent = (field) => <FormControl type={field.type} {...field.input} />;

export class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  componentWillUpdate() {
    console.log('updated component');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormGroup controlId="formUserEmail">
          <ControlLabel>Email</ControlLabel>
          <Field name="email" component={FieldComponent} type="text" />
        </FormGroup>

        <FormGroup controlId="formUserPassword">
          <ControlLabel>Password</ControlLabel>
          <Field name="password" type="password" component={FieldComponent} />
          <FormControl.Feedback />
        </FormGroup>

        <Checkbox>Remember me</Checkbox>

        <Button type="submit">Log in</Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
})(LoginForm);

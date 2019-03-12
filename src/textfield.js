// @flow
import React from 'react';
import { Fragment, Component} from 'react';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';

import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy';
import './textfield.css'

import axios from 'axios';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isVisible: false
    }
    //this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    /*let res = await axios.post('/api/users/login', {
      email: "admin",
      password: "password"
    });
    console.log(res);*/
    fetch('https://vcm-8670.vm.duke.edu:3000/api/users/login', {
      crossDomain: true,
      method: "POST",
      headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: {
        email: "admin",
        password: "password"
      }
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

 handleOnChange = (event: any) => {
    console.log(event.target.value);
 }

 validate(value) {
  if (value.length < 8) {
    return 'TOO_SHORT';
  }
  return undefined;
}
    /*this.setState({
        value: event.target.value
    }, function() {
        //if (this.state)
        if (this.state.isVisible && this.state.value.length >= 5) {
            this.setState({
                isVisible: false
            });
        }
    });*/

  onBlur = (event) => {
    let value = event.target.value;
    if (value.length >= 5) {
      this.setState({
        isVisible: false
      })
    } else {
      this.setState({
        isVisible: true
      })
    }
  }

  login(data) {
    console.log('form data', data);
      return new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
        data.username === 'error' ? { username: 'IN_USE' } : undefined,
      );
  }

  render() {
    return (
      <div style={
        {
          position: 'absolute', 
          left: '50%', 
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          width: '400px'
        }
      }>
      <h1>Register</h1>
      <Form onSubmit={this.login}>
      {({ formProps, submitting }) => (
        <form noValidate {...formProps}>
          <Field name="username" label="Username" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <Fragment>
                <Tooltip title="This is my tooltip" arrow={true} animation="perspective" open={this.state.isVisible} position="right"
                inertia={true} size="small" distance={15} theme="tomato">
                  <TextField autoComplete="off" placeholder="Placeholder" {...fieldProps} onBlur={this.onBlur}/>
                </Tooltip>
                {!error && (
                  <HelperMessage>
                    You can use letters, numbers & periods.
                  </HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>
                )}
              </Fragment>
            )}
          </Field>
          <Field
            name="password"
            label="Password"
            defaultValue=""
            isRequired
            onBlur={e => {console.log(e)}}
            validate={this.validate}
          >
            {({ fieldProps, error, meta }) => (
              <Fragment>
                <TextField type="password" {...fieldProps} />
                {!error && !meta.valid && (
                  <HelperMessage>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    Password needs to be more than 8 characters.
                  </ErrorMessage>
                )}
                {meta.valid && <ValidMessage>Awesome password!</ValidMessage>}
              </Fragment>
            )}
          </Field>
          <CheckboxField name="remember" label="Remember me" defaultIsChecked>
            {({ fieldProps }) => (
              <Checkbox {...fieldProps} label="Always sign in on this device" />
            )}
          </CheckboxField>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <Button type="submit" appearance="primary" isLoading={submitting}>
                Sign up
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
      </div>

    )
  }
}

export default Register;
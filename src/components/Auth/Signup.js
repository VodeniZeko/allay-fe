import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga'; // for google analytics
//actions
import signup from '../../state/actions/index';
//styles
import CustomSpinner from '../CustomSpinner.js';
import SignupLoginInput from '../Reusable/InputFields/SignupLoginInput.js';
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Select,
  Stack
} from '@chakra-ui/core';

const Signup = ({ signup, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  //validation
  function validateUsername(value) {
    let error;
    if (!value) {
      error = 'Username is required';
    } else if (value.length < 8) {
      error = 'Username must be at least 8 characters';
    }
    return error || true;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!value.includes('@')) {
      error = 'Must be a valid email';
    }
    return error || true;
  }

  function validateTrack(value) {
    let error;
    if (!value) {
      error = 'Lambda track is required';
    }
    return error || true;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
    return error || true;
  }
  // end validation

  const submitForm = creds => {
    if (creds.confirmPassword === creds.password) {
      signup({
        username: creds.username,
        email: creds.email,
        password: creds.password,
        track_name: creds.track_name
      }).then(() => history.push('/dashboard'));
    } else {
      console.log('form NOT submitted');
      alert('Your Passwords must match!');
    }
    ReactGA.event({
      category: 'User',
      action: `Button Sign Up`
    });
  };

  const gaLogin = () => {
    ReactGA.event({
      category: 'User',
      action: `Link Already have an account`
    });
  };

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100vh' h='100vh'>
        <Flex>
          <CustomSpinner />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex className='RegisterSplash' w='100%' minH='100vh' justify='center'>
      <Flex maxW='1440px' w='100%'>
        <Stack wrap='wrap' w='60%' ml='6.5%' justify='center' align='center'>
          <Text
            as='h1'
            w='100%'
            fontFamily='Poppins'
            fontSize='80px'
            fontWeight='bold'
          >
            Allay
          </Text>
          <Text w='100%' fontFamily='Poppins' fontSize='52px' fontWeight='bold'>
            We're stronger together.
          </Text>
        </Stack>
        <Flex w='60%' justify='center' align='center'>
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex
              w='490px'
              h='40%'
              p='6'
              flexDir='column'
              background='#FDFDFF'
              justify='center'
            >
              <FormControl isRequired isInvalid={errors.email}>
                <Flex as='h2' w='100%' mx='1' my='2%'>
                  Let's get started!
                </Flex>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Email</FormLabel>
                  <SignupLoginInput
                    type='email'
                    name='email'
                    label='email'
                    placeholder='someone@somedomain.com'
                    autoCapitalize='none'
                    ref={register({ validate: validateEmail })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isRequired isInvalid={errors.username}>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Username</FormLabel>
                  <SignupLoginInput
                    type='text'
                    name='username'
                    label='username'
                    autoCapitalize='none'
                    ref={register({ validate: validateUsername })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isRequired isInvalid={errors.track_name}>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Lambda Track</FormLabel>
                  <Select
                    h='70px'
                    variant='filled'
                    rounded='6px'
                    name='track_name'
                    label='track_name'
                    placeholder='Select Your Lambda Track'
                    ref={register({ validate: validateTrack })}
                  >
                    <option id='1' value='Android Development'>
                      Android Development
                    </option>
                    <option id='2' value='Data Science'>
                      Data Science
                    </option>
                    <option id='3' value='Full Stack Web Development'>
                      Full Stack Web Development
                    </option>
                    <option id='4' value='iOS Development'>
                      iOS Development{' '}
                    </option>
                    <option id='5' value='UX Design'>
                      UX Design
                    </option>
                  </Select>
                  <FormErrorMessage>
                    {errors.track_name && errors.track_name.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isRequired isInvalid={errors.password}>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <SignupLoginInput
                      type={show ? 'text' : 'password'}
                      name='password'
                      label='Password'
                      autoCapitalize='none'
                      ref={register({ validate: validatePassword })}
                    />
                    <InputRightElement width='4.5rem' py='32px'>
                      <Button
                        h='1.75rem'
                        color='rgba(72, 72, 72, 0.1)'
                        border='none'
                        size='sm'
                        onClick={handleClick}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormHelperText>
                    Must be longer than 8 characters
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>
              <FormControl isRequired>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <SignupLoginInput
                      type={show ? 'text' : 'password'}
                      name='confirmPassword'
                      label='Confirm Password'
                      autoCapitalize='none'
                      ref={register}
                    />
                    <InputRightElement width='4.5rem' py='32px'>
                      <Button
                        h='1.75rem'
                        color='rgba(72, 72, 72, 0.1)'
                        border='none'
                        size='sm'
                        onClick={handleClick}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
              <Button
                h='64px'
                mx='1%'
                my='6%'
                rounded='6px'
                border='none'
                size='lg'
                variantColor='teal'
                isLoading={formState.isSubmitting}
                type='submit'
              >
                Sign Up
              </Button>
              <Flex as='p' w='100%' justify='center'>
                <Link to='/' onClick={gaLogin}>
                  Already have an account?
                </Link>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, signup)(Signup);

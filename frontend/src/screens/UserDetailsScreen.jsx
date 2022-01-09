import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getStudentDetails } from '../actions/userActions';
import { STUDENT_DETAILS_RESET } from '../constants/userConstants';
// import RegistrationAlertSuccess from '../components/RegistrationAlertSuccess';
// import RegistrationAlertError from '../components/RegistrationAlertError';

const UserDetailsScreen = () => {
  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, user } = studentDetails;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [institution, setInstitution] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [areaOfSpecialization, setAreaOfSpecialization] = useState('');
  const [language, setLanguage] = useState('');

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // console.log(!!user);

  // console.log({ loading, user });

  // console.log({ error });

  useEffect(() => {
    if (user.firstName) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setLevel(user.level);
      setAddress(user.address);
      setState(user.state);
      setCity(user.city);
      setZip(user.zip);
      setCourseOfStudy(user.courseOfStudy);
      setInstitution(user.institution);
      setClassLevel(user.classLevel);
      setSchoolAddress(user.schoolAddress);
      setAreaOfSpecialization(user.areaOfSpecialization);
      setLanguage(user.language);
      dispatch({ type: STUDENT_DETAILS_RESET });
    } else {
      dispatch(getStudentDetails(params.id));
    }
  }, [user, dispatch, params]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/students');
  };

  // useEffect(() => {
  //   if (success) {
  //     window.setTimeout(() => {
  //       navigate('/');
  //     }, 3000);
  //   }
  // });

  // console.log({ success });

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      <form onSubmit={submitHandler}>
        {/* <PersonalInfo />
        <Profile /> */}
        {/* <Notification /> */}
        <div className='mb-3'>
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Personal Information
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Ensure the personal details you fill in is valid.
                </p>
              </div>
              <div className='mt-5 md:mt-0 md:col-span-2'>
                {/* <form action='#' method='POST'> */}
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='given-name'
                      value={firstName}
                      // onChange={(e) => setFirstName(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='last-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      autoComplete='family-name'
                      value={lastName}
                      // onChange={(e) => setLastName(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='email-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <input
                      type='text'
                      name='email-address'
                      id='email-address'
                      autoComplete='email'
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  {/* <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
                    </label>
                    <select
                      id='country'
                      name='country'
                      autoComplete='country-name'
                      value={country}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value='nigeria'>Nigeria</option>
                      <option value='ghana'>Ghana</option>
                      <option value='togo'>Togo</option>
                    </select>
                  </div> */}

                  <div className='col-span-6'>
                    <label
                      htmlFor='street-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Street address
                    </label>
                    <input
                      type='text'
                      name='street-address'
                      id='street-address'
                      autoComplete='street-address'
                      value={address}
                      // onChange={(e) => setAddress(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      name='city'
                      id='city'
                      autoComplete='address-level2'
                      value={city}
                      // onChange={(e) => setCity(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium text-gray-700'
                    >
                      State
                    </label>
                    <input
                      type='text'
                      name='region'
                      id='region'
                      autoComplete='address-level1'
                      value={state}
                      // onChange={(e) => setState(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium text-gray-700'
                    >
                      ZIP
                    </label>
                    <input
                      type='text'
                      name='postal-code'
                      id='postal-code'
                      autoComplete='postal-code'
                      value={zip}
                      // onChange={(e) => setZip(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Educational Information
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Ensure to enter the correct details
                </p>
              </div>
              <div className='mt-5 md:mt-0 md:col-span-2'>
                {/* <form action='#' method='POST'> */}
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-5'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Name of School
                    </label>
                    <input
                      type='text'
                      name='institution'
                      id='institution'
                      autoComplete='institution'
                      value={institution}
                      // onChange={(e) => setInstitution(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Level
                    </label>
                    <select
                      id='level'
                      name='level'
                      autoComplete='level'
                      value={level}
                      // onChange={(e) => setLevel(e.target.value)}
                      readOnly
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value='secondary'>Secodary School Student</option>
                      <option value='undergraduate'>Undergraduate</option>
                      <option value='corp_member'>Corp Member</option>
                    </select>
                  </div>

                  {level === 'undergraduate' || level === 'corp_member' ? (
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Course of Study
                        <input
                          type='text'
                          name='course-of-study'
                          id='course-of-study'
                          autoComplete='course-of-study'
                          value={courseOfStudy}
                          // onChange={(e) => setCourseOfStudy(e.target.value)}
                          readOnly
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </label>
                    </div>
                  ) : level === 'secondary' ? (
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Class
                      </label>
                      <select
                        id='class'
                        name='class'
                        autoComplete='class'
                        value={classLevel}
                        // onChange={(e) => setClassLevel(e.target.value)}
                        readOnly
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <option value='jss1'>JSS 1</option>
                        <option value='jss2'>JSS 2</option>
                        <option value='jss3'>JSS 3</option>
                        <option value='sss1'>SSS 1</option>
                        <option value='sss2'>SSS 2</option>
                        <option value='sss3'>SSS 3</option>
                      </select>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className='col-span-6'>
                    <label
                      htmlFor='school-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Address
                    </label>
                    <input
                      type='text'
                      name='school-address'
                      id='school-address'
                      autoComplete='school-address'
                      value={schoolAddress}
                      // onChange={(e) => setSchoolAddress(e.target.value)}
                      readOnly
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Specialization Information
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Ensure to enter the correct details
                </p>
              </div>
              <div className='mt-5 md:mt-0 md:col-span-2'>
                {/* <form action='#' method='POST'> */}
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='specialization'
                      className='block text-sm font-medium text-gray-700'
                    >
                      What digital skill will you like to learn?
                    </label>
                    <select
                      id='specialization'
                      name='specialization'
                      autoComplete='specialization'
                      value={areaOfSpecialization}
                      // onChange={(e) => setAreaOfSpecialization(e.target.value)}
                      readOnly
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value='programming'>Programming</option>
                      <option value='digital'>Digital Marketing</option>
                      <option value='ui_ux'>UI/UX</option>
                    </select>
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='language'
                      className='block text-sm font-medium text-gray-700'
                    >
                      If Programming skills, what language will you prefer?
                    </label>
                    <select
                      id='language'
                      name='language'
                      autoComplete='language'
                      value={language}
                      // onChange={(e) => setLanguage(e.target.value)}
                      readOnly
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value='javascript'>JavaScript</option>
                      <option value='python'>Python</option>
                      <option value='php'>PHP</option>
                    </select>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-5'
            // onClick={onCli}
          >
            Go back
          </button>
        </div>

        {/* {success && (
          <RegistrationAlertSuccess
            message={
              'Registration completed successfully. We will contact you shortly'
            }
          />
        )}
        {error && <RegistrationAlertError />} */}
      </form>
    </div>
  );
};

export default UserDetailsScreen;

import './App.css';
import React from 'react';
import { Field,Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <div>
    <div className='result'>
      <p>Full name: {localStorage.firstName} {localStorage.lastName}</p>
      <p>Email: {localStorage.email}</p>
      <p>Programmer: {localStorage.radioOption}</p>
      <p>Form of employment: {localStorage.employment}</p>
      <p>Date: {localStorage.date}</p>
    </div>
    <Formik
       initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        radioOption: '',
        employment: 'B2B',
        checkboxOption: false,
        date: new Date(),
      }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
         date: Yup.date().required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
           Object.entries(values).forEach(([key,value])=>{
            localStorage.setItem(key,value);
           });
         }, 400);
       }}
     >
       {formik => (
         <form onSubmit={formik.handleSubmit}>
           <p className="textInput">
           <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder='First name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />{formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
              ) : null}
            </p>

            <p className="textInput">
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder='Last name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />{formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
              ) : null}
              </p>
              
            <p className="textInput">
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />{formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              ) : null}
              </p>

           <fieldset>
            <legend>Are you programmer?</legend>
            <p className="radioInput">
            <label htmlFor="radioOption1">Yes</label>
            <input
              id="radioOption1"
              type="radio"
              name="radioOption"
              value="yes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            </p>

            <p className="radioInput">
            <label htmlFor="radioOption2">No</label>
            <input
              id="radioOption2"
              type="radio"
              name="radioOption"
              value="no"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            </p>
           </fieldset>
           <Field id="selectList" as="select" name="employment">
            <option value="B2B">B2B</option>
            <option value="Regular job">Regular job</option>
            <option value="Freelancer">Freelancer</option>
           </Field>
           <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={formik.values.date}
                onChange={date => formik.setFieldValue('date', date)}
                {...formik.date='date'}
           />
           <p className="checkInput">
           <label htmlFor="checkboxOption">Terms and some stuff</label>
           <input
            id="checkboxOption"
            type="checkbox"
            name="checkboxOption"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            {...formik.getFieldProps('checkboxOption')}
          />
          </p>
           <button id="submit" type="submit">Submit</button>
         </form>
       )}
     </Formik>
     
</div>
  );
}

export default App;

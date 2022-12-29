import './App.css';
import React from 'react';
import { Field,Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <div>
    <Formik
       initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        radioOption: '',
        color: 'red',
        checkboxOption: false,
        date: '',
      }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
         color: Yup.string().required('Color is required!'),
         date: Yup.date().required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {formik => (
         <form onSubmit={formik.handleSubmit}>
           <label htmlFor="firstName">First Name</label>
           <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
              {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
              ) : null}
              <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
              {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
              ) : null}
              <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
              {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              ) : null}

           <fieldset>
            <legend>Radio buttons</legend>
            <label htmlFor="radioOption1">Option 1</label>
            <input
              id="radioOption1"
              type="radio"
              name="radioOption"
              value="option1"
              {...formik.getFieldProps('radioOption')}
            />
            <label htmlFor="radioOption2">Option 2</label>
            <input
              id="radioOption2"
              type="radio"
              name="radioOption"
              value="option2"
              {...formik.getFieldProps('radioOption')}
            />
           </fieldset>
           <Field as="select" name="color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
           </Field>
           <DatePicker
                selected={formik.values.date}
                onChange={date => formik.setFieldValue('date', date)}
                {...formik.date='date'}
           />
           <button type="submit">Submit</button>
         </form>
       )}
     </Formik>
     
</div>
  );
}

export default App;

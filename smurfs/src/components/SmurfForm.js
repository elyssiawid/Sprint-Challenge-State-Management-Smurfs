import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Form, Grid, Icon, Segment, Header } from "semantic-ui-react";
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
//ACTIONS
import {
  ADD_SMURF_START,
  ADD_SMURF_SUCCESS,
  ADD_SMURF_FAIL
} from "../actions/actions";
const SmurfForm = props => {
  console.log(props);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        height: "",
        image: "",
        description: ""
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.resetForm();
        dispatch({ type: ADD_SMURF_START });
        axios
          .post("http://localhost:3333/smurfs", values)
          .then(res => {
            console.log(res.data);
            dispatch({ type: ADD_SMURF_SUCCESS, payload: res.data });
            actions.setSubmitting(false);
          })
          .catch(err => {
            console.log(err.response);
            dispatch({ type: ADD_SMURF_FAIL });
          });
      }}
      // validationSchema={UserSignUpSchema}

      render={({
        values,
        handleSubmit,
        handleChange,
        errors,
        touched,
        isSubmitting,
        ...props
      }) => (
        // <Grid style={{ height: '100vh' }} verticalAlign='middle' textAlign='center' divided stackable>

        // <Grid.Column width={6}>
        <Segment>
          ​
          <Form onSubmit={handleSubmit} size="big">
            ​
            <Form.Input
              type="text"
              name="name"
              placeholder="Smurf Name"
              value={values.name}
              onChange={handleChange}
              // error={touched.username && errors.username}
            />
            ​
            <Form.Input
              type="text"
              name="age"
              placeholder="Enter Smurf Age"
              value={values.age}
              onChange={handleChange}
              // error={touched.password && errors.password}
            />
            ​
            <Form.Input
              type="text"
              name="height"
              placeholder="Enter Smurf Height"
              value={values.height}
              onChange={handleChange}
              // error={touched.password && errors.password}
            />
            ​
            <Form.Input
              type="text"
              name="image"
              placeholder="Enter Image Link"
              value={values.image}
              onChange={handleChange}
              // error={touched.password && errors.password}
            />
            ​
            <Form.TextArea
              // type="text"
              name="description"
              placeholder="Enter Description"
              value={values.description}
              onChange={handleChange}
              // error={touched.password && errors.password}
            />
            ​
            <Button
              color="black"
              animated
              type="submit"
              fluid
              loading={isSubmitting}
              size="big"
            >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            ​
            {/* {error && <Header color='red' size='small'>Error ... Sever Not Found!</Header>} */}
            ​
          </Form>
          ​
        </Segment>
        // </Grid.Column>
        // </Grid>
      )}
    />
  );
};
export default SmurfForm;

import React, { Component } from 'react';
import { TextField} from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  
    
    /* background-position: center top; */
    background-size: cover;
    border-radius: 10px 10px 10px 10px;
    /* box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.07); */
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 30px;
    width: 600px;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  /* grid-template-columns: 40px 50px */
  /* grid-template-rows: 25% 100px auto; */
  /* align-items: flex-end; */
  /* width: 30% ;
  margin: 20px;
  padding: 10px; */
`
const Button = styled.button`
  background-color: #8d2663;
  color: white;
  text-decoration: none;
  padding: 5px;
  margin: 0 auto;
  margin-left: 3%;
  width: fit-content;
  height: 30px;
  border: 0px solid black;
  position: relative;
  border-radius: 10%;
`

class Form extends Component {
  state = {
      topicTitle: '',
      description: '',
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { topicTitle, description } = this.state;
    axios({
      url: '/topics',
      method: 'POST',
      data: {
        topicTitle,
        description
      }
    })
      .then((response) => {
        this.props.addTopic(response.data);
        this.setState({
          topicTitle: '',
          description: ''
        });
      })
      // .catch(() => alert('Failed uploading data'))
    window.location.reload(); 
  };
  render() {
    const CHARACTER_LIMIT = 280
    return (
      <Container>
        <form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
          <TextField
            id="standard-dense"
            value={this.state.topicTitle}
            label="Topic Title"
            name="topicTitle"
            onChange={this.handleChange}
            style = {{width: 400}}
            inputProps={{
              maxlength: CHARACTER_LIMIT
            }}
            // value={values.name}
            helperText={`${this.state.topicTitle.length}/${CHARACTER_LIMIT}`}
            // onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            name="description"
            value={this.state.description}
            id="standard-dense"
            onChange={this.handleChange}
            label="description"
            style = {{width: 400}}
            inputProps={{
              maxlength: CHARACTER_LIMIT
            }}
            // value={values.name}
            helperText={`${this.state.description.length}/${CHARACTER_LIMIT}`}
            // onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          />

          <Button variant="contained" color="primary" onClick={this.submit}> Submit </Button>
          

        </form>
      </Container>

    );
  }
}

export default Form;

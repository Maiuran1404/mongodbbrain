import React, { Component } from 'react';
import { TextField} from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';
import { withStyles } from "@material-ui/core/styles";

const Title = styled.h1`
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
font-size: 22px;
margin-top: 0px;
color: white;
margin-left: 10px;
margin-right: 10px;
margin-top: 30px;
display: flex;
`

const Subtitle = styled.p`
    color: #7C9CBF;
    font-size: 13px;
    margin-bottom: 0px;
    /* margin-left: 10px; */
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

const Input = styled.input`
  padding: 8px;
  margin: 10px auto;
  
`

const Form = styled.form`
  color: white;
`

const InputText = styled.div`
  width: 200px;
`

class NoteForm extends Component {
  state = {
      note: '',
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submit = (e) => {
    e.preventDefault();
    const { note } = this.state;
    const { _id } = this.props;
    axios({
      url: `/topics/${_id}/note`,
      method: 'PATCH',
      data: {
        note
      }
    })
      .then((response) => {
        // this.props.addNote(response.data);
        this.setState({
            note: ''
        });
      })
      // .catch(() => alert('Failed uploading data'))
    window.location.reload(); 
  };
  render() {
    const CHARACTER_LIMIT = 280

    return (
      <Form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
        
        {}
        
        <InputText>
          <TextField
            id="standard-dense"
            value={this.state.note}
            label="New Note"
            name="note"
            defaultValue="white"
            onChange={this.handleChange}
            rows    = "100"
            style = {{width: 400}}
            inputProps={{
              maxlength: CHARACTER_LIMIT
            }}
            // value={values.name}
            helperText={`${this.state.note.length}/${CHARACTER_LIMIT}`}
            // onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
            
          />
        </InputText>

        <br/>
        <br/>
        

        <Button variant="contained" color="primary" onClick={this.submit}> Submit </Button>
          
      </Form>
    );
  }
}

export default NoteForm;

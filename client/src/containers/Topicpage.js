import React, { Component, Fragment, Link } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 360px);
  grid-template-rows: repeat(3, auto);
  overflow: hidden;
  background: #2d2d2d;
  height: 100vh;
  gap: 0px 0px;
`

const HeadContainer = styled.div`
  position: relative;
  
`

const Container = styled.div`
  position: relative;
  background-color: white;
  color: black;
  margin-top: 10px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.04);
  width: 300px;
  height: 100px;
  margin: 50px;
  margin-left: 100px;
  padding: 10px;
  overflow: hidden;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  &:hover{
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
    /* padding: 11px; */
  }
`;

const Content = styled.div`
  width: 280px;
  height: 100px;
  margin-bottom: 20px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ContentColumn = styled.div`
    
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  display: block;
  margin-bottom: 8px;
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const TopicTitle = styled.h1`
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
font-size: 30px;
margin-top: 0px;
margin-left: 100px;
margin-right: 10px;
margin-top: 30px;
margin-bottom: 5px;
display: flex;
color: white;
`

const TopicSubtitle = styled.p`
    color: #7C9CBF;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 100px;
    margin-right: 10px;
    margin-top: 0px;
    display: flex;
    /* margin-left: 10px; */
`

const AddContainer = styled.div`
  margin-left: 40%;
  margin-top: 0%;
`

const Button = styled.a`
  /* display: inline-block; */
  border-radius: 12px;
  padding: 1rem 5px;
  margin: 1rem 1rem;
  width: 12%;
  height: 5%;
  background: #8d2663;
  text-decoration: none;
  margin-left: 26%;
  color: white;
  /* border: 1px solid black; */
  position: relative;
  /* right: -250px; */
  float: left;
`

class Topicpage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        topicId: '',
        topicTitle: '',
        description: '',
        notes: []
    };
    // this.removeTopic = this.removeTopic.bind(this);
    this.fetchTopic = this.fetchTopic.bind(this);
    this.addNote = this.addNote.bind(this);
    // this.addTopic = this.addTopic.bind(this);
}

  

  componentDidMount = () => {
    this.fetchTopic();
  };

  componentWillMount = () => {
    const topicId = decodeURI((this.props.match.params.topic).trim());
    this.setState({
      topicId: topicId
    })
    
    
  }

  addNote = ({ note }) => {
      this.setState({
          notes: this.state.notes.concat(note)
      })
  }

  fetchTopic = () => {
      console.log('Myaoooo' + this.state.topicId)
      axios.get(`/topics/${this.state.topicId}`)
        .then((response) => {
            console.log('sdfsdf',response.data)
            const { notes } = this.state;
            let newNotes = response.data.notes
            console.log('wakanda',newNotes)

            this.setState({
                topicTitle: response.data.topicTitle,
                description: response.data.description,
                notes: newNotes
            })
            console.log('Peteee' + this.state.notes)
        })
        .catch(() => alert('Error fethcing topic boi'))
  }




  render() {
    const { notes} = this.state
    console.log('haloå, no',notes)
    return (
      <div>
          {/* <h1>My notes</h1> */}
          { this.state.notes && 
          
              <Fragment>
                    
                      <Wrapper>
                      
                      <HeadContainer>
                        <TopicTitle>{this.state.topicTitle}</TopicTitle>
                        <TopicSubtitle>{this.state.description}</TopicSubtitle>
                        <Button as={Link} href='/'> Home </Button>
                      </HeadContainer>

                      <AddContainer>
                        <NoteForm _id={this.state.topicId} />
                      </AddContainer>
                      
                      <br/>
                      
                        {
                          this.state.notes.length > 0 && this.state.notes.map((note, i) => (
                            <Container>
                              <Content>
                                <ContentColumn key={i}>
                                    <Title>{note.note}</Title>
                                    <Subtitle>{moment(note.date).format("dddd, MMM DD")}</Subtitle>
                                </ContentColumn>
                              </Content>
                            </Container>
                          ))
                        }
                                
                              
                      </Wrapper>
                      
              </Fragment>
          } 


      </div>
    );
  }
}

export default Topicpage;

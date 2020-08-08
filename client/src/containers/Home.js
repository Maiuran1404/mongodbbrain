import React, { Component } from 'react';
import Form from '../components/Form';
import MyProfile from '../components/MyProfile';
import DisplayTopics from '../components/DisplayTopics';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 600px;
  /* gap: 1px 1px; */
  grid-template-areas: "Intro Intro Search Search" "Main Main Main Main" "Main Main Main Main";
  
`

const Search = styled.div`
  grid-area: Search;
  margin-bottom: 0px;
  padding-bottom: 0px;
`

const Intro = styled.div`
  grid-area: Intro;
  margin-bottom: 0px;
  padding-bottom: 0px;
`

const Main = styled.div`
  grid-area: Main;
  margin-top: 0px;
  margin-left: 100px;
`

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      topics: []
    };
    this.removeTopic = this.removeTopic.bind(this);
    this.fetchTopics = this.fetchTopics.bind(this);
    this.addTopic = this.addTopic.bind(this);
}


  componentDidMount = () => {
    this.fetchTopics();
    console.log('this is topics' + this.state.topics)
  };


  fetchTopics = () => {
    axios.get('/topics')
      .then((response) => {
        const { topics } = response.data;
        this.setState({
          topics: [...this.state.topics, ...topics]
        })
      })
      .catch(() => alert('Error fetching topics'));
  };

  addTopic = ({ topicTitle, description }) => {
    this.setState({
      topics: [...this.state.topics, { topicTitle: topicTitle, description: description  }]
      
    });
  };

  removeTopic(_id, i){
    
    // let topics = this.state.topics.slice();
    // topics.splice(i, 1);
    axios.delete(`/topics/${_id}`)

    // this.setState({
    //     topics: topics
    // });
}


  render() {
    return (
      <Container>
        <Intro><MyProfile /></Intro>
        <Search><Form addTopic={this.addTopic} style={Search}/></Search>
        <Main><DisplayTopics style={Main} topics={this.state.topics} removeTopic={this.removeTopic} /></Main>
      </Container>
    );
  }
}

export default Home;

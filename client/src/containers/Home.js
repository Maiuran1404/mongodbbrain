import React, { Component } from 'react';
import Form from '../components/Form';
import DisplayTopics from '../components/DisplayTopics';
import axios from 'axios';

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
      <div className="App">
        <Form addTopic={this.addTopic}/>
        <DisplayTopics topics={this.state.topics} removeTopic={this.removeTopic} />
      </div>
    );
  }
}

export default Home;
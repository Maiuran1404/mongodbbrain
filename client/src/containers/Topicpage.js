import React, { Component, Fragment } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';

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

  compon

  componentDidMount = () => {
    // this.fetchTopic();
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



//   addTopic = ({ topicTitle, description }) => {
//     this.setState({
//       topics: [...this.state.topics, { topicTitle: topicTitle, description: description  }]
      
//     });
//   };

//   removeTopic(_id, i){
    
//     // let topics = this.state.topics.slice();
//     // topics.splice(i, 1);
//     axios.delete(`/topics/${_id}`)

//     // this.setState({
//     //     topics: topics
//     // });
// }


  render() {
    const { notes} = this.state
    console.log('haloå, no',notes)
    return (
      <div>
          <h1>My notes</h1>
          { this.state.notes &&        
                  <Fragment>
                    <NoteForm _id={this.state.topicId} />
                            <h1>{this.state.topicId}</h1>
                            <p>{this.state.topicTitle}</p>
                            <p>{this.state.description}</p>
                            {/* <p>{this.state.notes}</p> */}
                          {console.log('Maayoo' + this.state.notes)}
                            {
                                this.state.notes.length > 0 && this.state.notes.map((note, i) => (
                                      <p key={i}>{note.note}</p>
                                ))
                            }
                            
                  </Fragment>   
          } 


      </div>
    );
  }
}

export default Topicpage;

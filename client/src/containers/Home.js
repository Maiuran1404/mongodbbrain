import React, { Component } from 'react';
import Form from '../components/Form';
import MyProfile from '../components/MyProfile';
import DisplayTopics from '../components/DisplayTopics';
import axios from 'axios';
import styled from 'styled-components';

const CheckBoxWrapper = styled.div`
  position: relative; 
  margin: 20px;
  margin-left: 600px;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #8d2663;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
const WholeWrapper = styled.div`

`

const Wrapper = styled.div`
  background-color: ${props => props.primary ? "#2d2d2d" : "white"};;
  color: ${props => props.primary ? "white" : "black"};
  height: 100vh;
`

const PlusButton = styled.button`
  color: black;
  padding: 5px;
  background-color: #7C9CBF;
  margin-left: 930px;
  margin-top: 10px;
  height: 50px;
	width: 120px;
  border-radius: 30%;
  border-color: white;
  border: none;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.04);
  &:hover{
    cursor: pointer;
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
    transform: rotateY(15deg);
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  /* gap: 1px 1px; */
  grid-template-areas: "Intro Intro Search Search" "Main Main Main Main" "Main Main Main Main";
`

const ToggleCreate = styled.button`
  padding: 10px;
  margin: 10px;
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
      topics: [],
      render: false,
      night: false
    };
    this.removeTopic = this.removeTopic.bind(this);
    this.fetchTopics = this.fetchTopics.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleColour = this.handleColour.bind(this);
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

    handleClick(){
      this.setState({
        render: !this.state.render});        
    }
    _renderSubComp(){
      switch(this.state.render){
          case true: return <Search><Form addTopic={this.addTopic} style={Search}/></Search>
      }
    }

    handleColour(){
      this.setState({
        night: !this.state.night});
    }

    mainReturn(){
      
    }

  render() {

    

    return (
      <WholeWrapper>
        
        {this.state.night ?  
        <Wrapper primary>
          
        <Container>
        
          <Intro>
            <MyProfile /></Intro>
          
          <Search>
            <CheckBoxWrapper>
              <CheckBox id="checkbox" type="checkbox" onClick={this.handleColour}/>
              <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
          </Search>

          
          {/* <Search><Form addTopic={this.addTopic} style={Search}/></Search> */}
          <Main>
            <PlusButton onClick={this.handleClick.bind(this, 'Form')}> Add new Topic </PlusButton>
            {this._renderSubComp()}
            <DisplayTopics style={Main} topics={this.state.topics} removeTopic={this.removeTopic} />
          </Main>
        </Container>

      </Wrapper>

            : 

        <Wrapper>

        <Container>
          <Intro><MyProfile /></Intro>
          
          <Search>
            <CheckBoxWrapper>
              <CheckBox id="checkbox" type="checkbox" onClick={this.handleColour}/>
              <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
          </Search>

          
          {/* <Search><Form addTopic={this.addTopic} style={Search}/></Search> */}
          <Main>
            <PlusButton onClick={this.handleClick.bind(this, 'Form')}> Add new Topic </PlusButton>
            {this._renderSubComp()}
            <DisplayTopics style={Main} topics={this.state.topics} removeTopic={this.removeTopic} />
          </Main>
        </Container>

      </Wrapper>
      
      }
        
      </WholeWrapper>


    );
  }
}

export default Home;

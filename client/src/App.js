import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//containers
import Home from './containers/Home';
import Topicpage from './containers/Topicpage';

class App extends Component {


    render(){

    
    return (
      

        
          <Router>
              <Switch>
                
                <Route exact path="/" component={Home} />
                <Route path="/mytopics/:topic" component={Topicpage} />
                {/* <Route render={
                  () => <h3>Oops, we couldn't find this page. Try reverting to homes</h3>
                }/> */}
              </Switch>
          </Router>

      );
    }
  }


export default App;

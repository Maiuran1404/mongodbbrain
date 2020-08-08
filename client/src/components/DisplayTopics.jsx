import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
const { isEmpty } = require('lodash');


const Container = styled.div`
  position: relative;
  margin-top: 0px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.04);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 300px;
  height: 100px;
  margin: 20px;
  padding: 10px;
  overflow: hidden;
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
  font-weight: 600;
  color: ${props => props.color};
  display: block;
  margin-bottom: 8px;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${props => props.color};
`;

const TagContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: ${props => props.tagBg};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 3px;
  width: 2000px;
  border-radius: 3px;
  text-align: center;
  color: ${props => props.tagColor};
`;

const TagText = styled.span``;

const IconContainer = styled.div`
  color: ${props => props.iconColor};
`;



class DisplayTopics extends Component {

    removeTopic(_id, i) {
        this.props.removeTopic(_id, i);
    }

    render() {
        const allTopics = this.props.topics;
        const topics = !isEmpty(allTopics) ? allTopics : [];


        return (
            <Fragment>
              {!isEmpty(topics) ? 
                <Fragment>

                {topics.map(({ topicTitle, description, _id }, key) => (
                <Container>
                        <Content>
                            <ContentColumn onClick={(e) => {e.preventDefault(); window.location.href=`/topics/${_id}`;}}>
                                <Title color='red'>{topicTitle}</Title>
                                <Subtitle color='green'>{description}</Subtitle>
                            </ContentColumn>
          
                        </Content>
                </Container>
                ))}

                </Fragment> : null}
        </Fragment>




            // {/* // <div className="topics">
            // //     {!isEmpty(topics) ? 
            // //     <div>

            // //             {topics.map(({ topicTitle, description, _id }, key) => (
                            
            // //                     <div key={key}>
            // //                         <h2> {topicTitle ? topicTitle : 'No Topic Title Found'} </h2>
            // //                         <p>{description ? description : 'No description Found'}</p>
            // //                         <button onClick={(e) => {e.preventDefault(); window.location.href=`/topics/${_id}`;}}>Open me</button>
            // //                         <button onClick={() => { this.removeTopic(_id, key)}} key={key}> Remove me </button>
            // //                     </div>
            // //             ))}
            // //     </div> : null}
            // // </div> */}
        );
    }
}





export default DisplayTopics;

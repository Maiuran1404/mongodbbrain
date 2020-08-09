import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
const { isEmpty } = require('lodash');

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 360px);
  grid-template-rows: repeat(3, auto);
  overflow: hidden;
  gap: 0px 0px;
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
  margin: 18px;
  padding: 10px;
  overflow: hidden;
  &:hover{
    cursor: pointer;
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
    /* padding: 11px; */
    margin: 20px;
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
                
                  <Wrapper>
                    {topics.map(({ topicTitle, description, _id }) => (
                        <Container>
                            <Content >
                                <ContentColumn key={_id} onClick={(e) => {e.preventDefault(); window.location.href=`/mytopics/${_id}`;}}>
                                    <Title>{topicTitle}</Title>
                                    <Subtitle>{description}</Subtitle>
                                </ContentColumn>
                                
                            </Content>
                          </Container>
                      ))}
                  </Wrapper>
                  
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

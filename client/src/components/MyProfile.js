import React, { Component, Fragment } from 'react';
import { motion } from "framer-motion";
import memoji from './memoji.jpg';
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
`

const Subtitle = styled.p`
    color: #7C9CBF;
    font-size: 13px;
    margin-bottom: 0px;
    /* margin-left: 10px; */
`

const Name = styled.h2`
    font-size: 22px;
    margin-top: 0px;

    /* margin-left: 10px; */
`

const Why = styled.h3`
    font-size: 16px;
    margin-bottom: 0px;
`

const Explanation = styled.p`
    font-size: 13px;
`



class MyProfile extends Component {
    render() {
        return (
            <Container>
                
                <motion.img
                    // initial={{ x: 100, y: -100, opacity: 0 }}
                    // animate={{ x: 30, y: -60, scale: 1.03, opacity: 1 }}
                    // transition={{ delay: 0.3 }}
                    key='image'
                    src={memoji}
                    width={150}/>

                    <div>
                        <Subtitle 
                            initial={{ x: 400, y: -100, opacity: 0 }}
                            animate={{ x: 300, y: -100, opacity: 1 }}
                            className='category'> Student at Minerva Schools </Subtitle>
                            <Name className='product-info'>Maiuran Loganathan</Name>
                            <Why>Why</Why>
                            <Explanation>Effectively build products- and startups that solve meaningful challenges</Explanation>
                    </div>

                    
                
            </Container>
        );
    }
}

export default MyProfile;
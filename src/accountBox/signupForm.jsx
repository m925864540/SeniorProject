import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, SubmitButton } from "./common";
import { Marginer } from "../components/marginer"
import { AccountContext } from "./accountContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'

export function SignUpForm(props){
    const { switchToLogin } = useContext(AccountContext);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[err, setError] = useState(false);
    const[message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', {
            full_name: name,
            email : email,
            password: password
          })
          .then(function (response) {
            console.log(response);
            history.push("/CustomerHomePage")
          })
          .catch(function (error) {
            setError(true);
            // console.log(error.response.data);
            if(error.response) setMessage(error.response.data)
            else setMessage("Something went wrong.")
          });
    }

    return <BoxContainer>
        <FormContainer onSubmit = {e => {handleSubmit(e)}}>
            <Input type ="text" name= "txt" placeholder="Full Name" 
                onChange = {e => setName(e.target.value)}/>
            <Input type="email" name="email" placeholder="Email"
                onChange = {e => setEmail(e.target.value)}/>
            <Input type ="password" name="password" placeholder="Password"
                onChange = {e => setPassword(e.target.value)}/>
            <Input type ="password" name="password" placeholder="Confirm Password"/>
            <Marginer direction="vertical" margin="1.6em" />
            {err ? <Alert variant = "danger">{message}</Alert> : <></>}
            <SubmitButton type="submit">Register</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
        </FormContainer>
        
        <small>Already have an account?<BoldLink href ="#" onClick={switchToLogin}>Login</BoldLink></small>
    </BoxContainer>
}
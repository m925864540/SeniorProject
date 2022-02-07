import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../components/marginer";
import { AccountContext } from "./accountContext";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import { Link} from "react-router-dom";
import axios from "axios";
// axios.defaults.withCredentials = true;

export function LoginForm(props){

    const { switchToSignup } = useContext(AccountContext);
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[err, setError] = useState(false);
    const[message, setMessage] = useState('');
    const history = useHistory(); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {
            email : email,
            password: password
          },{
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          .then(function (response) {
              history.push("/CustomerHomePage")
          })
          .catch(function (error) {
            setError(true);
            if(error.response) setMessage(error.response.data)
            else setMessage("Something went wrong.")
          });
    }

    return <BoxContainer>
        <FormContainer onSubmit = { e => {handleSubmit(e)}}>
            <Input type="email" name="email" placeholder="Email"
                onChange = {e => setEmail(e.target.value)}/>
            <Input type ="password" name= "password" placeholder="Password" 
                onChange = {e => setPassword(e.target.value)}/>
            {err ? <Alert variant = "danger">{message}</Alert> : <></>}
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit">Login</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
        </FormContainer>
        <Marginer direction="vertical" margin={5} />
        <MutedLink href = "#">Forgot your password?</MutedLink>
        <Marginer direction="vertical" margin="0.8em" />
        <small>Don't have an account?<BoldLink href="#" onClick={switchToSignup}>Sign Up</BoldLink></small>
        <Marginer direction="vertical" margin={5} />
        <Link to="/EmployeeLogin">Employee Login</Link>
    </BoxContainer>
}
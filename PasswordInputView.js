import React, { Component } from 'react';

import PasswordInput from "./../auth/client/components/PasswordInput"
export default class PasswordInputView extends Component {

    constructor(props) {
        super(props);

    }
    onSubmit = (validatePasswordMsg, confirmPassowrfMsg) => {
        console.log("validatePasswordMsg", validatePasswordMsg, "confirmPassowrfMsg", confirmPassowrfMsg)
    }
    render() {
        return (
            <PasswordInput onSubmit={this.onSubmit} passwordLabel="הכנס סיסמא" verifyPasswordLabel="הכנס סיסמא שנית"/>
        )

    }

}
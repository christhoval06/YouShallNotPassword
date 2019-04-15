import React from "react";

import Header from './Header';
import PasswordInput from './PasswordInput';

export default class YouShallNotPassword extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <PasswordInput/>
            </React.Fragment>
        );
    }
}

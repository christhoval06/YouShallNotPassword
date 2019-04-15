import React from "react";
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        color: theme.palette.primary.main,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});


const API_URL = '/api/v1/you_shall_not_passwords/validate_password';

class PasswordInput extends React.Component {

    state = {password: '', loading: false};

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    onValidateClick = () => {
        this.setState({loading: true}, () => {
            fetch(API_URL, {
                method: "POST",
                cache: "no-cache",
                mode: "cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'password': this.state.password})
            }).then(response => response.json())
                .then(data => {
                    console.log('data', data);
                    this.setState({loading: false});
                })
                .catch(error => {
                    console.error(error);
                    this.setState({loading: false});
                });
        });
    };

    render() {
        const {password, loading} = this.state;
        const {classes} = this.props;

        return (
            <React.Fragment>

                <div className={classes.root}>

                    <div className={classes.container}>
                        <TextField
                            id="password"
                            label="Enter your password here"
                            className={classes.textField}
                            value={password}
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />

                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loading}
                                onClick={this.onValidateClick}>
                                Validate
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>

                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(PasswordInput)

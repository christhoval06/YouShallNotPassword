import React from "react";
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
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
    title: {
        fontSize: '6.75em',
        lineHeight: '.4444444444em',
        paddingTop: '.4444444444em',
    },
    strength: {
        display: 'flex',
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',

    }
});


const API_URL = '/api/v1/you_shall_not_passwords/validate_password';

class PasswordInput extends React.Component {

    state = {password: '', loading: false, data: null};

    handleChange = name => event => {
        this.setState({[name]: event.target.value, data: null});
    };

    onValidateClick = () => {
        if (this.state.password.length === 0)
            return;

        this.setState({loading: true}, () => {
            fetch(API_URL, {
                method: "POST",
                cache: "no-cache",
                mode: "cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'password': this.state.password})
            }).then(response => response.json())
                .then(data => {
                    this.setState({loading: false, 'data': data.data});
                })
                .catch(error => {
                    console.error(error);
                    this.setState({loading: false});
                });
        });
    };

    render() {
        const {password, loading, data} = this.state;
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

                {data && (
                    <div className={classes.strength}>
                        <div>
                            <Typography variant="h1" color="inherit" className={classes.title}>
                                {data.strength}
                            </Typography>
                            <Typography variant="h3" gutterBottom color="inherit"
                                        style={{flex: 1}}/>
                            <Typography variant="h3" color="inherit"
                                        style={{flex: 1}}>score: {data.score}, password: {data.password}</Typography>
                        </div>
                    </div>
                )}

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(PasswordInput)

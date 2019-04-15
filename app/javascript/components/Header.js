import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

export default () => (
    <React.Fragment>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" style={{flex: 1}}>
                    TweetSec
                    <Typography variant="overline" gutterBottom color="inherit"
                                style={{flex: 1}}>@YouShallNotPassword</Typography>
                </Typography>
            </Toolbar>
        </AppBar>
    </React.Fragment>
);

import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

const useStyle = makeStyles(() => ({
    root: {
        // height: '200px',
        boxShadow: '5px 10px 5px #aaaaaa'
    }
}))

const Card1 = ({ onClick: onClickFunction, children }) => {
    const classes = useStyle();
    return (
        <Card onClick={onClickFunction ? () => onClickFunction() : null} className={classes.root}>
            {/* <CardContent> */}
                    {children}
            {/* </CardContent> */}
        </Card>
    )
}

export default Card1;
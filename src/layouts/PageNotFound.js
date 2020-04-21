import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";

export default class extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Typography
                    variant="h5"
                    color="secondary"
                >
                    404 page not found
                </Typography>
            </div>
        )
    }
}
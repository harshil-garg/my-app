import React from 'react';
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy';

class Tooltip2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isVisible: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.tip = React.createRef();
       // this.tippyInstance = React.createRef();
    }

    handleOnChange(event) {
        this.setState({
            value: event.target.value
        }, function() {
            //if (this.state)
            if (this.state.isVisible && this.state.value.length >= 5) {
                this.setState({
                    isVisible: false
                });
            }
        });
    }

    handleOnBlur(event) {
        if (!this.state.isVisible && this.state.value.length < 5) {
            this.setState({
                isVisible: true
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log(this.state.value);
    }

    render() {
        const { isVisible } = this.state;

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Tooltip title="This is my tooltip" arrow={true} animation="scale" open={isVisible} position="right">
                        <input id="source" value={this.state.value} onChange={this.handleOnChange} onBlur={this.handleOnBlur} ref={this.tip}/>
                    </Tooltip>
                    <button type="submit" value="Submit">Activate Lasers</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Tooltip2;
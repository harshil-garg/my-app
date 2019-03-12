import React from 'react';
import Tippy from '@tippy.js/react'

class Tooltip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isVisible: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.tippyInstance = React.createRef();
    }

    handleOnChange(event) {
        this.setState({
            value: event.target.value
        }, function() {
            //if (this.state)
            if (!this.state.isVisible) {
                this.setState({
                    isVisible: true
                });
            } else {
                this.setState({
                    isVisible: false
                });
            }
        });
        /*this.setState({
            value: event.target.value
        }, function() {
            if (this.state.isVisible) {
                if (this.state.value.length >=5) {
                    this.setState({
                        isVisible: false
                    });
                }
            } else {
                if (this.state.value.length < 5) {
                    this.setState({
                        isVisible: true
                    })
                }
            }
        });*/
    }

    handleOnBlur(event) {
        /*if (!this.state.isVisible && this.state.value.length < 5) {
            this.setState({
                isVisible: true
            })
        }*/
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
                    <Tippy content="Hello" arrow={true} trigger="click" 
                    animation="scale" isVisible={isVisible}
                    onShown={() => {console.log("Fuck this");}} 
                    onCreate={instance => (this.tippyInstance.current = instance)}
                    hideOnClick={false}>
                        <input id="source" value={this.state.value} onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                    </Tippy>
                    <button type="submit" value="Submit">Activate Lasers</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Tooltip;
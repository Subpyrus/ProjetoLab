import React from 'react';
import { Alert } from 'reactstrap';
import connect from 'react-redux'

class AlertComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onDismiss = () => {
        /*const { resetNotification } = this.props*/
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const { message, typeAlert } = this.props
        return (
            <Alert color={typeAlert} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert>
        )
    }
}

export default AlertComponent;
/*export default connect(null, mapDispatchToProps)(AlertComponent)*/

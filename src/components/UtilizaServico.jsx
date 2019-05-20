import React from 'react'
import { Switch } from '@material-ui/core';

class UtilizaServico extends React.Component {

    handleChange = (elemento) => event => {
        this.props.onUtiliza(elemento,event.target.checked) 
    };

    render(){
        
        const {elemento} = this.props;

        return(
            <Switch checked={elemento.status} onChange={this.handleChange(elemento)} aria-label="status" color="primary" />
        )
    }
}

export default UtilizaServico
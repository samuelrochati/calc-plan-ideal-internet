import React from 'react'
import { Fab } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

class Contador extends React.Component {

    render(){

        const {elemento,onIncrement,desativado} = this.props;
        
        return(
            <div>
                <Fab onClick={()=>onIncrement(elemento,-1)} size="small" color="primary" aria-label="Add" disabled={desativado}>
                    <RemoveIcon />
                </Fab>
                <b style={{fontSize:20, padding:20}}>{elemento.count}</b>
                <Fab onClick={()=>onIncrement(elemento,1)} size="small" color="primary" aria-label="Add" disabled={desativado}>
                    <AddIcon />
                </Fab>       
            </div>
        );
    }
}

export default Contador
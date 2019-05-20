import React, { Component } from 'react'
import { Grid, Paper, BottomNavigation, BottomNavigationAction, TextField } from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';
import Add from '@material-ui/icons/Add';
import BarChart from '@material-ui/icons/BarChart';

const currencies = [
    {
      value: 'USD',
      label: 'Samuel R',
    },
    {
      value: 'EUR',
      label: 'Carlos V',
    },
    {
      value: 'BTC',
      label: 'Bruno R',
    },
    {
      value: 'JPY',
      label: 'Thalles',
    },
  ];
const status = [
    {
        value: 'aberto',
        label: 'Em Aberto',
      },
      {
        value: 'andamento',
        label: 'Em Andamento',
      },
      {
        value: 'concluida',
        label: 'Concluída',
      },                 
      {
        value: 'calcelada',
        label: 'Cancelada',
      }, 
    ];  

export class OrdemServico extends Component {

    state = {
        value: 0,
        currency:'Joseft',
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeSelect = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };    
    
  render() {
    return (
        <div style={{ margin: 40}}>
            <Grid container spacing={0} justify="center" >
                <Grid item xs={8}>
                    <Paper square style={{ marginBottom: 40}}>
                        <BottomNavigation
                            value={this.state.value}
                            onChange={this.handleChange}
                            showLabels
                        >
                            <BottomNavigationAction label="Add OS" icon={<Add />} />                        
                            <BottomNavigationAction label="Buscar OS" icon={<FilterList />} />
                            <BottomNavigationAction label="Relatórios" icon={<BarChart />} />
                        </BottomNavigation>
                    </Paper>
                    <Paper style={{ padding: '15px' }}>
                        <TextField
                            id="defeito-input"
                            label="Defeito Apresentado"
                            name="defeito"
                            multiline
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            helperText="Entre com o defeito que o colaborador informou no chamado."
                        />
                        <TextField
                            id="solucao-input"
                            label="Solução"
                            name="solucao"
                            multiline
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            helperText="Informe o que foi feito para solucionar a ordem de serviço."
                        />     
                        <TextField
                            id="colaborador-input"
                            select
                            label="Colaborador"
                            value={this.state.currency}
                            onChange={this.handleChangeSelect('currency')}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Selecione o colaborador solicitante."
                            margin="normal"
                            variant="outlined"
                            >
                            {currencies.map(option => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>    
                        <TextField
                            id="status-input"
                            select
                            label="Status"
                            value={this.state.currency}
                            onChange={this.handleChangeSelect('status')}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Selecione o status atual da ordem de serviço."
                            margin="normal"
                            variant="outlined"
                            style={{marginLeft: 8}}
                            >
                            {status.map(option => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>                                                        
                        <TextField
                            id="data-abertura-input"
                            type="date"
                            name="data_abertura"
                            margin="normal"
                            variant="outlined"
                            helperText="Data de abertura da ordem de serviço."
                            style={{marginLeft: 8}}
                        />
                        <TextField
                            id="data-fechamento-input"
                            type="date"
                            name="data_fechamento"
                            margin="normal"
                            variant="outlined"
                            helperText="Data de fechamento da ordem de serviço."
                            style={{marginLeft: 8}}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>   
    )
  }
}

export default OrdemServico

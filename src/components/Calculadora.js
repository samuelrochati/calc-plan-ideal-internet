import React from 'react'
import Grid from '@material-ui/core/Grid'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Table, TableHead, TableRow, TableBody, TableCell, Button, Tooltip, Paper, Stepper, Step, StepLabel} from '@material-ui/core'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Autorenew from '@material-ui/icons/Autorenew'
import Contador from './Contador';
import UtilizaServico from './UtilizaServico';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node,
  dir: PropTypes.string,
};

const stateInicial = {
  value:0,
  step1:true,
  step1completed:false,
  step2:false,
  step2completed:false,
  step3:false,
  step3completed:false,  
  elementos:[
    {
      id:1,
      nome:"Smartphones",
      count:0
    },
    {
      id:2,
      nome:"Computador",
      count:0
    },
    {
      id:3,
      nome:"Smart TV",
      count:0
    },
    {
      id:4,
      nome:"Vídeo Games",
      count:0
    },
    {
      id:5,
      nome:"Youtube",
      status:false,
      count:0,
    },
    {
      id:6,
      nome:"Netflix",
      status:false,
      count:0,
    },
    {
      id:7,
      nome:"Netflix 4K",
      status:false,
      count:0,
    },
    {
      id:8,
      nome:"Games Online",
      status:false,
      count:0,
    },
    {
      id:9,
      nome:"Redes Sociais",
      status:false,
      count:0,
    },
    {
      id:10,
      nome:"App Streaming",
      status:false,
      count:0,
    },
    {
      id:11,
      nome:"IPTV",
      status:false,
      count:0, 
    }                                       
  ],
  plano_minimo: "-",
  plano_recomendado: "-",
  plano_conforto: "-",
};

export class Calculadora extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      value:0,
      step1:true,
      step1completed:false,
      step2:false,
      step2completed:false,
      step3:false,
      step3completed:false,
      elementos:[
        {
          id:1,
          nome:"Smartphones",
          count:0
        },
        {
          id:2,
          nome:"Computador",
          count:0
        },
        {
          id:3,
          nome:"Smart TV",
          count:0
        },
        {
          id:4,
          nome:"Vídeo Games",
          count:0
        },
        {
          id:5,
          nome:"Youtube",
          status:false,
          count:0,
        },
        {
          id:6,
          nome:"Netflix",
          status:false,
          count:0,
        },
        {
          id:7,
          nome:"Netflix 4K",
          status:false,
          count:0,
        },
        {
          id:8,
          nome:"Games Online",
          status:false,
          count:0,
        },
        {
          id:9,
          nome:"Redes Sociais",
          status:false,
          count:0,
        },
        {
          id:10,
          nome:"App Streaming",
          status:false,
          count:0,
        },
        {
          id:11,
          nome:"IPTV",
          status:false,
          count:0, 
        }                                       
      ],
      plano_minimo: "-",
      plano_recomendado: "-",
      plano_conforto: "-",
    }; 
  }

  onDefault = () => {

    let ele = this.state.elementos.map(el => {
      el.count = 0
      el.status = false
      return el;
    });

    this.setState({
      ...stateInicial,
      elementos: ele
    });
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
    if(value === 2) this.onCalculaPlano()
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
    switch (index) {
      case 1:
        this.setState({step1completed:true})
        this.setState({step2:true})
        this.setState({step2completed:false})
        this.setState({step3:false})
        this.setState({step3completed:false})        
        break;
      case 2:
        this.setState({step2completed:true})
        this.setState({step3:true})
        this.setState({step3completed:true})
        break;        
      default:
        this.setState({step1completed:false})
        this.setState({step2:false})
        this.setState({step2completed:false})
        this.setState({step3:false})
        this.setState({step3completed:false}) 
        break;
    }
  };

  onIncrement=(elemento,count)=>{   
     
    const index = this.state.elementos.indexOf(elemento)
    const elementos = [...this.state.elementos]   
    elementos[index].count+=count;
    if(elementos[index].count < 0 ) elementos[index].count = 0;

    this.setState({elementos});

  }

  onUtiliza = (elemento,status) => {

    const index = this.state.elementos.indexOf(elemento)
    const elementos = [...this.state.elementos]   
    elementos[index].status = status;

    if (elementos[index].status === false) {  
      elementos[index].count = 0;  
    } 

    this.setState({elementos});

  }

  onDesativa=(status)=>{
    const marcador = (status)? false : true;
    return marcador
  }

  onCalculaPlano = () =>{

    const elementos = [...this.state.elementos]

    const pesos = [
      { id: 5, default: 2, 2: 3, 3:5, 4:7, 5:10 },
      { id: 6, default: 3, 2: 5, 3:7, 4:10, 5:15 },
      { id: 7, default: 7, 2: 10, 3:15, 4:10, 5:30 },
      { id: 8, default: 10, 2: 15, 3:20, 4:30, 5:50 },
      { id: 9, default: 2, 2: 3, 3:5, 4:7, 5:10 },
      { id: 10, default: 2, 2: 3, 3:5, 4:7, 5:10 },
      { id: 11, default: 3, 2: 5, 3:7, 4:10, 5:15 }
    ]

    var pesoPlano = elementos.filter(elementos=> elementos.id > 4).reduce(function(sum,arr){
      
      var peso = pesos.filter(pesos => pesos.id === arr.id).map(pesos => {
        if(arr.status === true && arr.count <= 1){
          return pesos.default
        }else if(arr.status === true && arr.count > 1){
          return pesos[arr.count]
        }else{
          return 0
        }
      })

      return sum + parseInt(peso);

    },0);
    
    let pesoFinal = parseInt(pesoPlano)
    
    if(pesoFinal > 0 && pesoFinal <= 3){
        this.setState({plano_minimo: "3MB"})
        this.setState({plano_recomendado:"3MB"})
        this.setState({plano_conforto:"5MB"})
    }else if(pesoFinal > 3 && pesoFinal <= 5){
        this.setState({plano_minimo: "3MB"})
        this.setState({plano_recomendado:"5MB"})
        this.setState({plano_conforto:"10MB"})      
    }else if(pesoFinal > 5 && pesoFinal <= 10){
        this.setState({plano_minimo: "5MB"})
        this.setState({plano_recomendado:"10MB"})
        this.setState({plano_conforto:"15MB"})      
    }else if(pesoFinal > 10 && pesoFinal <= 15){
        this.setState({plano_minimo: "10MB"})
        this.setState({plano_recomendado:"15MB"})
        this.setState({plano_conforto:"20MB"})
    }else if(pesoFinal > 15 && pesoFinal <= 20){
        this.setState({plano_minimo: "15MB"})
        this.setState({plano_recomendado:"20MB"})
        this.setState({plano_conforto:"30MB"})      
    }else if(pesoFinal > 20 && pesoFinal <= 30){
        this.setState({plano_minimo: "20MB"})
        this.setState({plano_recomendado:"30MB"})
        this.setState({plano_conforto:"50MB"})      
    }else if(pesoFinal > 30 && pesoFinal <= 50){
        this.setState({plano_minimo: "30MB"})
        this.setState({plano_recomendado:"50MB"})
        this.setState({plano_conforto:"100MB"})      
    }else if(pesoFinal > 50 && pesoFinal <= 100){
        this.setState({plano_minimo: "50MB"})
        this.setState({plano_recomendado:"100MB"})
        this.setState({plano_conforto:"+100MB"})      
    }else if(pesoFinal > 100){
        this.setState({plano_minimo: "100MB"})
        this.setState({plano_recomendado:"+100MB"})
        this.setState({plano_conforto:"+100MB"})      
    }else{
        this.setState({plano_minimo: "-"})
        this.setState({plano_recomendado:"-"})
        this.setState({plano_conforto:"-"}) 
    }

  }

  render() {

    const { elementos } = this.state;

    return (

      <div style={{ margin: 40}}>
        <Grid container spacing={0} justify="center" >
          <Grid item xs={8}>  

            <Paper style={{ marginBottom: 40}}>
              <Stepper alternativeLabel>
              <Step active={this.state.step1} completed={this.state.step1completed}>
                <StepLabel>
                  <Typography variant="caption">
                    Selecione a quantidade de dispositivos que pussui.
                  </Typography>
                </StepLabel>
              </Step>
              <Step active={this.state.step2} completed={this.state.step2completed}>
                <StepLabel>
                  <Typography variant="caption">
                    Marque os checkbox dos serviços utilizados e informe a quantidade de dispositivos que são utilizados de forma simultânea.
                  </Typography>
                </StepLabel>
              </Step>
              <Step active={this.state.step3} completed={this.state.step3completed}>
                <StepLabel>
                  <Typography variant="caption">
                    Planos indicados para você!
                  </Typography>                      
                </StepLabel>
              </Step>                                        
              </Stepper> 
            </Paper>

            <Paper>
              <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex} >

              <TabContainer>                               

                <Table style={{width: '100%'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight:"bold",fontSize:14,textAlign:"center"}} component="th">Dispositivos:</TableCell>
                      <TableCell style={{fontWeight:"bold",fontSize:14,textAlign:"center"}} component="th">Quantidade:</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {elementos.filter(elemento => elemento.id <= 4).map(elemento =>{
                      return (
                      <TableRow key={elemento.id}>
                        <TableCell style={{textAlign:"center"}}>{elemento.nome}</TableCell>
                        <TableCell style={{textAlign:"center"}}>
                          <Contador onIncrement={this.onIncrement} elemento={elemento}  />                        
                        </TableCell>
                      </TableRow>)
                    })}
                                             
                  </TableBody>
                </Table> 
                
                <div style={{ marginTop:20}}>
                  <Grid container spacing={0} justify="center" >
                    <Grid item >
                      <Tooltip title="Avançar para a escolha dos serviços utilizados." aria-label="Avançar">
                        <Button onClick={()=>this.handleChangeIndex(1)} variant="contained" color={"primary"}>
                          <ChevronRight />
                        </Button>       
                      </Tooltip>
                  </Grid>
                  </Grid>             
                </div>

                <p style={{textAlign:"center"}}>
                  <strong>Importante:</strong> O simulador se baseia em valores aproximados e deve ser utilizado apenas como uma referência.
                </p>

              </TabContainer>

              <TabContainer>             

                <Table style={{width: '100%'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight:"bold",fontSize:14,textAlign:"center"}} component="th">Serviço</TableCell>
                      <TableCell style={{fontWeight:"bold",fontSize:14,textAlign:"center"}} component="th">Usa?</TableCell>
                      <TableCell style={{fontWeight:"bold",fontSize:14,textAlign:"center"}} component="th">Quant. Simultâneos:</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {elementos.filter(elemento => elemento.id > 4).map(elemento =>{
                      return (
                      <TableRow key={elemento.id}>
                        <TableCell style={{textAlign:"center"}}> {elemento.nome} </TableCell> 
                        <TableCell style={{textAlign:"center"}}> 
                          <UtilizaServico onUtiliza={this.onUtiliza} elemento={elemento}/>
                        </TableCell>
                        <TableCell style={{textAlign:"center"}}>
                          <Contador desativado={this.onDesativa(elemento.status)} onIncrement={this.onIncrement} elemento={elemento}  />                            
                        </TableCell>
                      </TableRow>
                      )
                    })}
                                                                                                                                           
                  </TableBody>
                </Table> 

                <div style={{ marginTop:20}}>
                  <Grid container spacing={0} justify="center" >
                    <Grid item>
                    < Tooltip title="Volta para a seleção de dispositivos." aria-label="Avançar">
                        <Button onClick={()=>this.handleChangeIndex(0)} variant="contained" color={"primary"} style={{marginRight:10}}>
                          <ChevronLeft />
                        </Button>       
                      </Tooltip>                    
                      <Tooltip title="Avançar e ver planos recomendados." aria-label="Avançar">
                        <Button onClick={()=>{this.handleChangeIndex(2);this.onCalculaPlano()}} variant="contained" color={"primary"} style={{marginLeft:10}}>
                          <ChevronRight />
                        </Button>       
                      </Tooltip>
                  </Grid>
                  </Grid>             
                </div>

                <p style={{textAlign:"center"}}>
                  <strong>Importante:</strong> O simulador se baseia em valores aproximados e deve ser utilizado apenas como uma referência.
                </p>                

              </TabContainer>

              <TabContainer>               

                <Grid container spacing={24} direction={"row"} justify="center" alignItems={"center"}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Paper square={true}>
                      <p style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary" fullWidth>
                          Plano Mínimo
                        </Button>
                      </p>
                      <Typography variant="subtitle1" gutterBottom={true} style={{textAlign:"center"}}>
                        INTERNET ILIMITADA
                      </Typography>                      
                      <Typography variant="h2" gutterBottom={true} style={{textAlign:"center",paddingTop:10}}>
                        {this.state.plano_minimo}
                      </Typography>
                      <p style={{textAlign:"center",marginRight:10,marginLeft:10, paddingBottom:15}}>
                        Internet de alta velocidade sem franquia, com navegação Ilimitada durante todo o mês.
                      </p>                                           
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Paper elevation={12} square={true}>                   
                      <p style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary" fullWidth>
                          Plano Recomendado
                        </Button>
                      </p> 
                      <Typography variant="subtitle1" gutterBottom={true} style={{textAlign:"center"}}>
                      INTERNET ILIMITADA
                      </Typography>                     
                      <Typography variant="h2" gutterBottom={true} style={{textAlign:"center",paddingTop:10}}>
                        {this.state.plano_recomendado}
                      </Typography>
                      <p style={{textAlign:"center",marginRight:10,marginLeft:10, paddingBottom:15}}>
                        Internet de alta velocidade sem franquia, com navegação Ilimitada durante todo o mês.
                      </p>                          
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Paper square={true}>
                      <p style={{textAlign:"center"}}>
                        <Button variant="contained" color="primary" fullWidth>
                          Plano Confortável
                        </Button>
                      </p>
                      <Typography variant="subtitle1" gutterBottom={true} style={{textAlign:"center"}}>
                        INTERNET ILIMITADA
                      </Typography>                      
                      <Typography variant="h2" gutterBottom={true} style={{textAlign:"center",paddingTop:10}}>
                        {this.state.plano_conforto}
                      </Typography>                                    
                      <p style={{textAlign:"center",marginRight:10,marginLeft:10, paddingBottom:15}}>
                        Internet de alta velocidade sem franquia, com navegação Ilimitada durante todo o mês.
                      </p>                       
                    </Paper>
                  </Grid>
                </Grid>

                <div style={{ marginTop:20}}>
                  <Grid container spacing={0} justify="center" >
                    <Grid item>
                    < Tooltip title="Volta para a escolha dos serviços utilizados" aria-label="Avançar">
                        <Button onClick={()=>this.handleChangeIndex(1)} variant="contained" color={"primary"} style={{marginRight:10}}>
                          <ChevronLeft />
                        </Button>       
                      </Tooltip>                    
                      <Tooltip title="Calcular novamente." aria-label="Calcular Novamente">
                        <Button onClick={()=>{this.handleChangeIndex(0);this.onDefault();}} variant="contained" color={"secondary"} style={{marginLeft:10}}>
                          <Autorenew />
                        </Button>       
                      </Tooltip>
                    </Grid>
                  </Grid>             
                </div>

                <p style={{textAlign:"center"}}>
                  <strong>Importante:</strong> O simulador se baseia em valores aproximados e deve ser utilizado apenas como uma referência.
                </p>

                <p style={{textAlign:"center"}}>
                  *SE AINDA NÃO É CLIENTE, CLIQUE AQUI E CONHEÇA NOSSOS PLANOS.
                </p>                 

              </TabContainer>

            </SwipeableViews>                   
            </Paper>

          </Grid>
        </Grid>
        
      </div>   

    )
  }
}

export default Calculadora;
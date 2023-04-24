import React, { ChangeEvent, Component } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios'; 
import store from '../../shared/store';
import { getTaskDetails, listTasks } from '../../shared/action';
import { connect } from 'react-redux';
import { Switch } from '@mui/material';
import { MongoClient, Db } from "mongodb";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  function createData(
    name: string,
    description: string,
    status: string,
    
  ) {
    return { name, description, status };
  }

  interface Props {
    listTasks: typeof listTasks;
    tasks: any;
    getTaskDetails: typeof getTaskDetails;
    taskDetails: any
  }

 class list extends Component<Props, any> {
  private client!: MongoClient;
  private db!: Db;
  constructor(props: Props){
    
    super(props);
    
    this.state = {isOpen:false};
    const uri = "mongodb+srv://admin:admin@todo.r8irnsr.mongodb.net/?retryWrites=true&w=majority";
    this.client = new MongoClient(uri);
    this.connectToDatabase();
  //   this.state = { tasks: [createData('training', 'This is regarding the new plan', 'open'),
  //   createData('training1', 'This is regarding the new plan1', 'open'),
  //   createData('training2', 'This is regarding the new plan2', 'open')],
  //   isOpen: false ,
  //   addForm: {
  //     name: '',
  //     description: '',
  //   }
  // }
  }
  
  async connectToDatabase() {
    await this.client.connect();
    this.db = this.client.db('todo');
  }
  async componentDidMount() {
   const taskRequest =  await this.db.collection("my-collection").find().toArray();
   console.log(taskRequest)
  //  await this.props.listTasks(taskRequest.data);
  //  console.log(this.state);
  }

  deleteTask = (index: number) => {
    this.setState({tasks: this.state.tasks.filter((el: any, arrindex: number) => arrindex !== index)});
  }
  addTask = () => {
    this.state.tasks.push(this.state.addForm);
    this.setState({addForm: {
      name: '',
      description: '',
      status:'open'
    }});
    this.ToggleModal(this.state);
  }

  ToggleModal = (id: any) => {
    this.setState({isOpen: !this.state.isOpen});
  }

  changeValue = (e: any) => {
    console.log(e);
    let key = e.target.name;
    let value = e.target.value
    this.setState((values: any) => ({addForm:{...values.addForm, [key]: value}}));
  }
  
 render() {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      if (this.props.tasks === null ) {
        return <>
        <div>No tasks are there !!!</div>
          <Button variant="contained" size="large" onClick={this.addTask}>
                Add
              </Button>
        </>;
      }  
   const flipStatus = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
     this.props.taskDetails.isOpen = !this.props.taskDetails.isOpen;
   }

    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.tasks?.map((row: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" key={index}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center" >{row.status}</TableCell>
                  <TableCell align="center" >
                  <Button variant="text" onClick={() => this.ToggleModal(row.id)}>Edit</Button> 
                  |  
                  <Button variant="text" onClick={() => this.deleteTask(index)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={this.ToggleModal}>Add Task</Button>
        <Modal
          open={this.state.isOpen}
          onClose={this.ToggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={style}
            noValidate
            autoComplete="off"
          >
              <TextField
                id="task-name"
                name='name'
                label="Task Name"
                type="text"
                autoComplete="Task Name"
                margin="dense"
                fullWidth
                onChange={(e) => this.changeValue(e)}
              />
              <TextField
                id="task-Description"
                label="Task Description"
                name='description'
                type="text"
                autoComplete="Task Description"
                margin="dense"
                fullWidth 
                onChange={(e) => this.changeValue(e)}
              />

              <Switch
                checked={this.props?.taskDetails?.isOpen}
                onChange={flipStatus}
                inputProps={{ 'aria-label': 'controlled' }}
              /><br />

               <Button variant="contained" size="large" onClick={this.addTask}>
                Add
              </Button>
          </Box>  
        </Modal>        
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    tasks: state.tasks,
    taskDetails: state.taskDetails
  };
};
export default connect(mapStateToProps, { listTasks,getTaskDetails })(list);
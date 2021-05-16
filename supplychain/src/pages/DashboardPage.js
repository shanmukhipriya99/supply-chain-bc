import Page from 'components/Page';
import axios from '../axios';
import React from 'react';
import { Button, Card, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
import Typography from 'components/Typography';
class DashboardPage extends React.Component {
  state = {
    role: null,
    assetList: [],
    creators: [],
    owners: []
  };

  componentDidMount() {
    axios.get("/getPID").then(response => {
      console.log(response);
      localStorage.setItem("PID", response.data.PID);
      localStorage.setItem("email", response.data.email);
  })
  .catch(err => {
      if (err.response.status === 401) {
          alert("Unauthorized!");
          this.props.history.push("/");
      }
  });
    axios.get('/getRole').then(response => {
      this.setState({ role: response.data.role });
    }).catch(err => {
      if (err.response.status === 500) {
        alert("Server error, please try again later!");
      } else if (err.response.status === 401) {
        alert("Unauthorized!");
        this.props.history.push("/");
      }
    });
    axios.get("/getAssets").then(response => {
      // console.log(response.data.Assets);
      this.setState({ assetList: response.data.Assets, creators: response.data.creators, owners: response.data.owners})
    }).catch(err => {
      if (err.response.status === 500) {
        alert("Server error, please try again later!");
      } else if (err.response.status === 401) {
        alert("Unauthorized!");
        this.props.history.push("/");
      }
    });
  }

  submitHandler = () => {
    this.props.history.push("/addAsset");
  };

  render() {
    let card = null;
    let assets = [];
    let message = '';
    let url="/transferAsset/";
    if(this.state.role === "Farmer") {
      card = (<Card body inverse color="secondary">
      <CardTitle tag="h5">Add an Asset</CardTitle>
      <CardText>Click the button below to add an asset.</CardText>
      <Button color="light" onClick={() => this.submitHandler()}>
        Add
      </Button>
    </Card>);
    }
    if(this.state.assetList.length != 0) {
      let transfer = 'Cannot transfer!';
      let asts = '';
      for(let i=0; i<this.state.assetList.length; i++) {
        let date = new Date(this.state.assetList[i].time*1000).toLocaleDateString("en-US");
        let owner = this.state.owners[i];
        let creator = this.state.creators[i];
        let url = "/transferAsset/"+this.state.assetList[i].AID;
        if(owner === creator) {
          transfer = (<td>
            <a href={url}>Transfer</a> 
          </td>);
    }
    asts = (<tbody key={i}>
      <tr>
        <th scope="row">{i+1}</th>
        <td><a href={"/trackAsset/"+this.state.assetList[i].AID}>{this.state.assetList[i].AName}</a></td>
        <td>{creator}</td>
        <td>{owner}</td>
        <td>{date}</td>
        {transfer}
      </tr>
    </tbody>);
    assets.push(asts)
      }
    } else {
      message = <Typography type="display-4">No assets created or owned!</Typography>

    }

    return (
      <Page
        className="Dashboard"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        {<Row>
          <Col
            xl={5}
            style={{
              display: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {card}
          </Col>
        </Row>}
        <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Asset Name</th>
            <th>Creator Name</th>
            <th>Owner Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
          {assets}
      </Table>
      <p>Total Assets: {this.state.assetList.length}</p>
      </Page>
    );
  }
}
export default DashboardPage;

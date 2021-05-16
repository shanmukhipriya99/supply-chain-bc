import Page from 'components/Page';
import axios from '../axios';
import React from 'react';
import { Button, Card, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
import Typography from 'components/Typography';
class DashboardPage extends React.Component {
  state = {
    role: null,
    assetList: []
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
      this.setState({ assetList: response.data.Assets})
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
    let url="/transferAsset/";
    let assets = <Typography type="display-4">No assets created or owned!</Typography>
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
      assets = this.state.assetList.map((asset, index) => {
        let date = new Date(asset.time*1000).toLocaleDateString("en-US");
        let owner = asset.owner;
        let creator = asset.creator;
        let transfer = '';
        if(owner === creator) {
          transfer = (<td>
            <a href={url.concat(asset.AID)}>Transfer</a> 
          </td>);
    }
        return(
          <tbody key={index}>
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>{asset.AName}</td>
                      <td>{asset.creator}</td>
                      <td>{asset.owner}</td>
                      <td>{date}</td>
                      {transfer}
                    </tr>
                  </tbody>
        )
      });
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

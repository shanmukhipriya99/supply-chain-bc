import Page from 'components/Page';
import React, { Component } from 'react';
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from '../axios';
import web3 from '../web3';
import contract from '../contract';

class AddAsset extends Component {
  state = {
    aid: '',
    message: null,
    errorMessage: '',
  };

  componentDidMount() {
    // console.log(web3.version);
    // web3.eth.getAccounts().then(console.log);
    axios.get('/getAID').then(response => {
      console.log(response.data.id);
      this.setState({ aid: response.data.id });
    });
  }

  submitHandler = async () => {
    let asset = {
      AID: this.state.aid,
      AName: document.getElementById('AName').value,
      creator: localStorage.getItem('PID'),
      owner: localStorage.getItem('PID'),
    };
    this.setState({ message: 'Creating Asset...' });
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .createAsset(asset.AID, asset.AName, asset.creator, asset.owner)
        .send({
          from: accounts[0],
        });
      axios
        .post('/createAsset', asset)
        .then(response => {
          // console.log(response);
          if (response.status === 201) {
            this.setState({ message: null });
            alert('Asset Created!');
            this.props.history.push('/dashboard');
          }
        })
        .catch(err => {
          if (err.response.status === 500) {
            alert('Server error, please try again later!');
          } else if (err.response.status === 401) {
            alert('Unauthorized!');
            this.props.history.push('/');
          }
        });
    } catch (err) {
      this.setState({ message: null });
      this.setState({ errorMessage: err.message });
      setTimeout( () => document.location.reload(), 4000);
      // console.log(err.message);
    }
  };

  render() {
    let card = null;
    if (this.state.errorMessage !== '') {
      card = (
        <Card
          style={{
            marginTop: '20px',
            padding: '10px'
          }}
          color={'danger'}
          border="light"
        >
          <CardTitle tag="h5">Oops!!</CardTitle>
          <CardBody>{this.state.errorMessage}</CardBody>
        </Card>
      );
    }
    return (
      <Page
        title="Add Asset"
        breadcrumbs={[{ name: 'Add Asset', active: true }]}
      >
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Fill the details:</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Name</Label>
                    <Input type="text" id="AName" placeholder="Asset Name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="creator">Creator</Label>
                    <Input
                      plaintext
                      value={localStorage.getItem('email')}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="owner">Owner</Label>
                    <Input
                      plaintext
                      value={localStorage.getItem('email')}
                      readOnly
                    />
                  </FormGroup>
                </Form>
                <Button color="secondary" onClick={() => this.submitHandler()}>
                  Add
                </Button>
                <br />
                {this.state.message}
                {card}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default AddAsset;

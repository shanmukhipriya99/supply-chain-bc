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

class AddTxn extends Component {
  state = {
    assetname: '',
    message: '',
    receiver: '',
    assetDetails: {},
    errorMessage: '',
  };

  componentDidMount() {
    axios
      .get('/assetName/' + this.props.match.params.id)
      .then(response => {
        console.log(response.data.AssetName[0].AName);
        this.setState({ assetname: response.data.AssetName[0].AName });
      })
      .catch(err => {
        if (err.response.status === 500) {
          alert('Server error, please try again later!');
        } else if (err.response.status === 401) {
          alert('Unauthorized!');
          this.props.history.push('/');
        }
      });
  }

  inputHandler = () => {
    let asset = {
      Receiver: document.getElementById('Receiver').value,
    };
    this.setState({ assetDetails: asset });
  };

  submitHandler = async () => {
    // console.log(this.state.assetDetails);
    axios
      .post('/receiverPID', this.state.assetDetails)
      .then(response => {
        // console.log(response.data.PID);
        this.setState({ receiver: response.data.PID });
      })
      .catch(err => {
        if (err.response.status === 500) {
          alert('Server error, please try again later!');
        } else if (err.response.status === 401) {
          alert('Unauthorized!');
          this.props.history.push('/');
        }
      });
    this.setState({ message: 'Transfering Asset...' });
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .transferAsset(this.props.match.params.id, this.state.receiver)
        .send({
          from: accounts[0],
        });
      axios
        .post(
          '/transferAsset/' + this.props.match.params.id,
          this.state.assetDetails,
        )
        .then(response => {
          // console.log(response);
          if (response.status === 200) {
            this.setState({ message: null });
            alert('Asset Transferred!');
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
        title="Transfer Asset"
        breadcrumbs={[{ name: 'Transfer Asset', active: true }]}
      >
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Fill the details:</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="assetName">Asset Name</Label>
                    <Input plaintext value={this.state.assetname} readOnly />
                  </FormGroup>
                  <FormGroup>
                    <Label for="sender">Sender</Label>
                    <Input
                      plaintext
                      value={localStorage.getItem('email')}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="receiver">Receiver</Label>
                    <Input
                      type="email"
                      id="Receiver"
                      placeholder="Receiver Email"
                      onChange={() => this.inputHandler()}
                    />
                  </FormGroup>
                </Form>
                <Button color="secondary" onClick={() => this.submitHandler()}>
                  Transfer
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

export default AddTxn;

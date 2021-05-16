import Page from 'components/Page';
import React, {Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from '../axios';

class AddTxn extends Component {

  state = {
    assetname: null
  }

    componentDidMount() {
      axios.get("/assetName/"+this.props.match.params.id).then(response => {
        console.log(response.data.AssetName[0].AName);
        this.setState({ assetname: response.data.AssetName[0].AName})
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
        let asset = {
            Receiver: document.getElementById("Receiver").value
        }
        axios.post("/transferAsset/"+this.props.match.params.id, asset).then(response => {
            // console.log(response);
            if(response.status === 200){
                alert("Asset Transferred!");
                this.props.history.push("/dashboard");
            }
        }).catch(err => {
          if (err.response.status === 500) {
            alert("Server error, please try again later!");
          } else if (err.response.status === 401) {
            alert("Unauthorized!");
            this.props.history.push("/");
          }
        });
    }

    render() {
        return (
            <Page title="Transfer Asset" breadcrumbs={[{ name: 'Transfer Asset', active: true }]}>
              <Row>
                <Col xl={12} lg={12} md={12}>
                  <Card>
                    <CardHeader>Fill the details:</CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup>
                          <Label for="assetName">Asset Name</Label>
                          <Input
                          plaintext
                          value={this.state.assetname}
                          readOnly
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="sender">Sender</Label>
                        <Input
                          plaintext
                          value={localStorage.getItem("email")}
                          readOnly
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="receiver">Receiver</Label>
                        <Input
                            type="email"
                            id="Receiver"
                            placeholder="Receiver Email"
                          />
                      </FormGroup>
                      </Form>
                      <Button color="secondary" onClick={() => this.submitHandler()}>
                      Transfer
                    </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Page>
          );
        }
    }
    
  
  export default AddTxn;
  
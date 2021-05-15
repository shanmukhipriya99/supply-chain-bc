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

class AddAsset extends Component {

    componentDidMount() {
        axios.get("/getPID").then(response => {
            console.log(response);
            localStorage.setItem("PID", response.data.PID);
            localStorage.setItem("email", response.data.email);
        })
        .catch(err => {
            if (err.response.status === 401) {
                alert("Unauthorized!");
            }
        });
    }

    submitHandler = () => {
        let asset = {
            AName: document.getElementById("AName").value,
            creator: localStorage.getItem("PID"),
            owner: localStorage.getItem("PID"),
        }
        axios.post("/createAsset", asset).then(response => {
            // console.log(response);
            if(response.status === 201){
                alert("Asset Created!");
                this.props.history.push("/dashboard");
            }
        })
    }

    render() {
        return (
            <Page title="Add Asset" breadcrumbs={[{ name: 'Add Asset', active: true }]}>
              <Row>
                <Col xl={12} lg={12} md={12}>
                  <Card>
                    <CardHeader>Fill the details:</CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup>
                          <Label for="exampleEmail">Name</Label>
                          <Input
                            type="text"
                            id="AName"
                            placeholder="Asset Name"
                          />
                        </FormGroup>
                        <FormGroup>
                        <Label for="creator">Creator</Label>
                        <Input
                          plaintext
                          value={localStorage.getItem("email")}
                          readOnly
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="owner">Owner</Label>
                        <Input
                          plaintext
                          value={localStorage.getItem("email")}
                          readOnly
                        />
                      </FormGroup>
                      </Form>
                      <Button color="secondary" onClick={() => this.submitHandler()}>
                      Add
                    </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Page>
          );
        }
    }
    
  
  export default AddAsset;
  
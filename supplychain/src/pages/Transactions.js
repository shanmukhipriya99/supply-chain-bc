import axios from '../axios';
import Page from 'components/Page';
import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Typography from 'components/Typography';

const tableTypes = ['', 'bordered', 'striped', 'hover'];

class Transactions extends Component {

  state = {
    assetNames: [],
    senders: [],
    receivers: [],
    time: [],
  }

  componentDidMount() {
    axios.get("/getTxns").then(response => {
      console.log(response.data);
      this.setState({ assetNames: response.data.ANames, senders: response.data.Senders, receivers: response.data.Receivers, time: response.data.Time});
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
    let txns = <Typography type="display-4">No assets created or owned!</Typography>;
    let transactions = [];
    let cName = "table-success";
    if(this.state.assetNames.length != 0) {
      for(let i=0; i<this.state.assetNames.length; i++){
        let date = new Date(this.state.time[i]*1000).toLocaleDateString("en-US");
        if(this.state.senders[i] === localStorage.getItem("email")) {
          cName = "table-danger";
        }
        txns =  (
                <tbody key={i}>
                          <tr className={cName}>
                            <th scope="row">{i+1}</th>
                            <td>{this.state.assetNames[i]}</td>
                            <td>{this.state.senders[i]}</td>
                            <td>{this.state.receivers[i]}</td>
                            <td>{date}</td>
                          </tr>
                        </tbody>
              )
              transactions.push(txns);
              console.log(this.state.senders[i],  localStorage.getItem("email"));
      }
    }
    return (
      <Page
        title="Transactions"
        breadcrumbs={[{ name: 'transactions', active: true }]}
        className="Transactions"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>Responsive</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Asset ID</th>
                      <th>Sender</th>
                      <th>Receiver</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  {transactions}
                </Table>
                <p>Total Transactions: {this.state.assetNames.length}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </Page>
    );
  }
  
};

export default Transactions;



 //   txns = this.state.txns.map((txn, index) => {
    //     let cName = "table-success";
    //     if(txn.Sender === localStorage.getItem("PID")) {
    //       cName = "table-danger";
    //     }
    // let date = new Date(txn.time*1000).toLocaleDateString("en-US");
    //     return (
    //       <tbody key={index}>
    //                 <tr className={cName}>
    //                   <th scope="row">{index+1}</th>
    //                   <td>{txn.AID}</td>
    //                   <td>{txn.Sender}</td>
    //                   <td>{txn.Receiver}</td>
    //                   <td>{date}</td>
    //                 </tr>
    //               </tbody>
    //     )
    //   });
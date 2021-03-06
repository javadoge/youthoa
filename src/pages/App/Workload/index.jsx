import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from '@/components/Workload/DataList';
import NewItemBtn from '@/components/NewItemBtn';
import ModalAdd from '@/components/Workload/ModalAdd';

class AppWorkload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      currentId: 0
    };
  }
  componentDidMount() {
    this.getWorkloadList();
  }
  getWorkloadList = () => {
    axios
      .get(`${this.props.baseUrl}/workloads`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  createWorkload = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .post(`${this.props.baseUrl}/workloads`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getWorkloadList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  showModal = (type, id) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: true });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: true, currentId: id });
        break;
      default:
        message.error('出错啦~');
    }
  };
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            console.log(values);
            this.createWorkload(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'renew':
            console.log(values);
            this.setState({ modalRenewVisible: false, currentId: 0 });
            break;
          default:
            message.error('出现错误');
        }
      }
    });
  };
  handleCancel = (type, form) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: false });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: false });
        break;
      default:
        message.error('出错啦~');
    }
    form.resetFields();
  };
  handleDelete = e => {
    console.log('delete');
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <NewItemBtn label="记录工作量" showModal={this.showModal} />
        <DataList
          data={this.state.data}
          showModal={this.showModal}
          handleDelete={this.handleDelete}
          handleExpandRow={this.handleExpandRow}
        />
        <ModalAdd
          visible={this.state.modalAddVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(AppWorkload);

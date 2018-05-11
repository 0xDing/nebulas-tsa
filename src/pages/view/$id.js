import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Status from 'grommet/components/icons/Status';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Label from 'grommet/components/Label';
import {FormattedMessage} from 'react-intl';
import {validHash} from "../../utils/sdk";
import styles from './index.less';

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: this.props.location.pathname.replace('/view/', ''),
      loading: true,
      data: {}
    };
  }

  componentDidMount() {
    validHash(this.state.hash).then((data) => {
      this.setState({loading: false, data: JSON.parse(data)});
    });
  }

  errorView() {
    return (
      <Box direction='row'
           justify='center'
           align='center'>
        <Heading margin='none'>
          <FormattedMessage id='page.view.notFound'/>
        </Heading>
      </Box>
    );
  }

  resultView() {
    return (
      <Box direction='column'
           justify='center'
           align='center'>
        <Heading margin='none'>
          <Status value='ok'/> <FormattedMessage id='page.view.exist'/>
        </Heading>
        <div className={styles.list}>
          <List>
            <ListItem justify='between'
                      separator='horizontal'>
              <Label><FormattedMessage id='page.view.author'/></Label>
              <span><a href={`https://explorer.nebulas.io/#/address/${this.state.data.author}`}
                       target="_blank" rel="noopener noreferrer">{this.state.data.author}</a> </span>
            </ListItem>
            <ListItem justify='between'
                      separator='horizontal'>
              <Label><FormattedMessage id='page.view.time'/></Label>
              <span>{new Date(parseInt(this.state.data.createdAt, 10)).toISOString()}</span>
            </ListItem>
            <ListItem justify='between'
                      separator='horizontal'>
              <Label><FormattedMessage id='page.view.authBy'/></Label>
              <span><img src={require('../../assets/nebulasx60.png')} style={{height: '2em'}} alt="Nebulas Blockchian" /></span>
            </ListItem>
          </List>
        </div>
      </Box>
    );
  }

  render() {
    return (<Hero>
      {
        (this.state.loading) ? (
          <Box direction='row' justify='center' align='center'>
            <Heading margin='none'>
              <Spinning/> Loading...
            </Heading>
          </Box>
        ) : (
          (this.state.data == null) ? this.errorView() : this.resultView()
        )
      }
    </Hero>);
  }

}

export default ViewPage;

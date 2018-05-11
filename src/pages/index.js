import React from 'react';
import Quote from 'grommet/components/Quote';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Notification from 'grommet/components/Notification';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import Dropzone from 'react-dropzone';
import SHA3 from 'crypto-js/sha3';
import styles from './index.less';
import {validHash, submit} from "../utils/sdk";


class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hash: '',
      data: {},
      showTips: false
    };
  }

  onDrop(files){
    const file = files[0];
    this.setState({loading: true});
    const reader = new FileReader();
    reader.onload = (e)=> {
      const hash = SHA3(e.target.result).toString();
      validHash(hash).then((data)=>{
        this.setState({
          loading: false,
          hash: hash,
          data: JSON.parse(data)
        });
      });

    };
    reader.readAsBinaryString(file);
  }

  contractResult(){
    return (this.state.data == null) ? (
      <div className={styles.contractResult}>
        <Button label={(<FormattedMessage id='page.index.submit' />)}
                onClick={()=>{
                  submit(this.state.hash);
                  this.setState({showTips: true});
                }}
                primary={true} />
      </div>
    ):(
      <Notification message={<FormattedHTMLMessage id='page.index.exist'
                                                   values={{url: `/view/${this.state.hash}`}}
      />} status='warning' />
    );
  }


  render(){
    return (
      <div>
        {this.state.showTips && (
          <Notification message={<FormattedHTMLMessage id='page.index.tips'
                                                   values={{url: `/view/${this.state.hash}`}}
          />} status='ok' />
        )}
        <Quote size='full'>
          <FormattedMessage id='page.index.desc' />
        </Quote>
        <Dropzone onDrop={this.onDrop.bind(this)}
                  multiple={false}
                  className={styles.dropzone}>
          {this.state.loading ? (<FormattedMessage id='page.index.loading' />):(<FormattedMessage id='page.index.dropzone' />)}
        </Dropzone>
        <FormField hidden={!this.state.hash} strong size='large' label={<FormattedMessage id='page.index.hash' />}>
          <TextInput value={this.state.hash} disabled />
        </FormField>
        {this.state.hash && this.contractResult()}
      </div>
    );
  }
}

export default IndexPage;

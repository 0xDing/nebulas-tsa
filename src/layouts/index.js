import React from 'react';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import SocialShare from 'grommet/components/SocialShare';
import Paragraph from 'grommet/components/Paragraph';
import styles from './index.less';
import En from '../locales/en';
import ZhHans from '../locales/zh-hans';


class Layout extends React.Component {

  constructor(props) {
    super(props);
    const browserLang = navigator.language || navigator.browserLanguage;
    this.state = {
      locale: browserLang.indexOf('zh') > -1 ? 'zh-hans' : 'en'
    };
  }

  appLocale() {
    let result = {};
    if (this.state.locale === 'zh-hans'){
      result = ZhHans;
    }else{
      result = En;
    }
    addLocaleData(...result.data);
    return result;
  }

  localeSelect(){
    const locales= {
      'en': {
        lang: 'zh-hans',
        display: '中文'
      },
      'zh-hans': {
        lang: 'en',
        display: 'EN'
      }
    };
    const available_locales = locales[this.state.locale];
    return(
      <div className={styles.i18nBtn}>
        <Button label={available_locales.display}
                plain
                onClick={()=>{this.setState({locale: available_locales.lang});}}
        />
      </div>
    );
  }

  render(){
    const distUrl = 'http://nebulas-tsa.boris.tech/';
    const appLocale = this.appLocale();
    return (
      <IntlProvider locale={appLocale.locale}
                    messages={appLocale.messages}
                    formats={appLocale.formats}
      >
        <App>
          <Header>
            <Link to="/">
            <Title>
              Nebulas TSA
            </Title>
            </Link>
            <Box flex={true}
                 justify='end'
                 direction='row'
                 responsive={false}>
              <Menu direction='row'
                    size='medium'
                    dropAlign={{"right": "right"}}>
                {this.localeSelect()}
              </Menu>
            </Box>
          </Header>
          <Section className={styles.content}>
            {this.props.children}
          </Section>
          <Footer justify='center'>
            <Box direction='column'
                 align='center'>
              <Menu direction='row'>
                <SocialShare type='facebook'
                             link={distUrl}/>
                <SocialShare type='twitter'
                             link={distUrl}/>
                <SocialShare type='google'
                             link={distUrl}/>
              </Menu>
              <i><FormattedMessage id='layout.footer.desc' /></i>
              <Paragraph margin='none'>
                &copy; 2018 <a href="https://boris.tech" target="_blank" rel="noopener noreferrer">Boris Ding</a>.&nbsp;
                <FormattedMessage id='layout.footer.powered_by'
                                  values={{
                                    nebulas: (<a href='https://nebulas.io/' target='_blank' rel="noopener noreferrer">Nebulas</a>)
                                  }}
                />
              </Paragraph>
            </Box>
          </Footer>
        </App>
      </IntlProvider>
    );
  }
}
export default withRouter(Layout);

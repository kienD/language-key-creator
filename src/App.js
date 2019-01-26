import './App.css';
import Clipboard from 'clipboard';
import React, {Component} from 'react';
import title from 'title';
import {
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  PageHeader,
  Panel,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import {capitalizeTitle, splitKeys, toLanguageKey} from './util/language-key';
import {compact} from 'lodash';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this._clipboard = new Clipboard('[data-clipboard-text]');

    this.handleCapitalizationChange = this.handleCapitalizationChange.bind(
      this,
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleAuto = this.handleToggleAuto.bind(this);
    this.handleToggleCase = this.handleToggleCase.bind(this);

    this.state = {
      autoTitleCase: true,
      capitalizationRule: 'titles',
      languageKey: '',
      titleCase: false,
      value: '',
    };
  }

  componentWillUnmount() {
    this._clipboard.destroy();
  }

  handleChange(event) {
    const {value} = event.target;

    this.setState({
      languageKey: toLanguageKey(value),
      value,
    });
  }

  handleToggleAuto() {
    const {autoTitleCase} = this.state;

    this.setState({
      autoTitleCase: !autoTitleCase,
    });
  }

  handleToggleCase() {
    const {titleCase} = this.state;

    this.setState({
      titleCase: !titleCase,
    });
  }

  handleCapitalizationChange(capitalizationRule) {
    this.setState({
      capitalizationRule,
    });
  }

  createKeys() {
    const {capitalizationRule, value} = this.state;

    const keys = splitKeys(value);

    return compact(keys).map(key => {
      let retVal = key;

      if (capitalizationRule === 'titles') {
        retVal = capitalizeTitle(retVal);
      } else if (capitalizationRule === 'all') {
        retVal = title(retVal);
      }

      return `${toLanguageKey(key)}=${retVal}`;
    });
  }

  render() {
    const {value} = this.state;

    const copyData = this.createKeys();

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col>
              <PageHeader>{'Language Key Creator'}</PageHeader>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Panel>
                <Panel.Body>
                  <form>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>{'Input'}</ControlLabel>

                      <ButtonToolbar>
                        <ToggleButtonGroup
                          defaultValue="titles"
                          name="test"
                          onChange={this.handleCapitalizationChange}>
                          <ToggleButton value="all">
                            {'Capitalize All'}
                          </ToggleButton>
                          <ToggleButton value="titles">
                            {'Capitalize Titles'}
                          </ToggleButton>
                          <ToggleButton value="none">
                            {'Capitalize None'}
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>

                      <FormControl
                        componentClass="textarea"
                        placeholder="Enter String"
                        onChange={this.handleChange}
                        type="textarea"
                        value={value}
                      />
                    </FormGroup>
                  </form>
                </Panel.Body>
              </Panel>
            </Col>

            <Col md={6}>
              <Panel bsSize="large">
                <Panel.Body>
                  <ControlLabel>{'Output'}</ControlLabel>

                  <ButtonToolbar>
                    <Button data-clipboard-text={copyData.join('\n')}>
                      {'Copy Pair'}
                    </Button>
                  </ButtonToolbar>

                  <div className="output">
                    {value &&
                      copyData.map((val, i) => {
                        return (
                          <div className="language-key-full" key={i}>
                            {val}
                          </div>
                        );
                      })}
                  </div>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

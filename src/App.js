import './App.css';
import capitalize from 'chicago-capitalize';
import Clipboard from 'clipboard';
import React, {Component} from 'react';
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  InputGroup,
  Row,
} from 'react-bootstrap';
import {capitalizeTitle, toLanguageKey} from './util/language-key';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this._clipboard = new Clipboard('[data-clipboard-text]');

    this.handleChange = this.handleChange.bind(this);
    this.handleToggleAuto = this.handleToggleAuto.bind(this);
    this.handleToggleCase = this.handleToggleCase.bind(this);

    this.state = {
      autoTitleCase: true,
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

  render() {
    const {autoTitleCase, languageKey, titleCase, value} = this.state;

    let retVal = value;

    if (autoTitleCase) {
      retVal = capitalizeTitle(retVal);
    } else if (titleCase) {
      retVal = capitalize(value);
    }

    const copyData = `${languageKey}=${retVal}`;

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col>
              <form>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>{'Language Key Creator'}</ControlLabel>

                  <InputGroup>
                    <FormControl
                      placeholder="Enter String"
                      onChange={this.handleChange}
                      type="text"
                      value={value}
                    />

                    <InputGroup.Button>
                      <Button data-clipboard-text={copyData}>
                        {'Copy Pair'}
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>

                  <Checkbox
                    inline
                    onChange={this.handleToggleAuto}
                    checked={autoTitleCase}>
                    {'Auto Capitalize Titles'}
                  </Checkbox>

                  <Checkbox
                    disabled={autoTitleCase}
                    inline
                    onChange={this.handleToggleCase}
                    checked={titleCase}>
                    {'Title Case'}
                  </Checkbox>

                  <FormControl.Feedback />

                  {value && <HelpBlock>{copyData}</HelpBlock>}
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

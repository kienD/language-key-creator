import './App.css';
import Clipboard from 'clipboard';
import React, {Component} from 'react';
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  InputGroup,
  Row,
} from 'react-bootstrap';
import {toLanguageKey} from './util/language-key';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this._clipboard = new Clipboard('[data-clipboard-text]');
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      languageKey: '',
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

  render() {
    const {languageKey, value} = this.state;

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
                      <Button data-clipboard-text={`${languageKey}=${value}`}>
                        {'Copy Pair'}
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>

                  <FormControl.Feedback />

                  <HelpBlock>{languageKey}</HelpBlock>
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

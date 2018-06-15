import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import titleCase from 'title-case'
import camelCase from 'camel-case'
import axios from 'axios'

import './index.css'

export default class Form extends Component {
  state = {
    firstName: '',
    lastName: '',
    companyName: '',
    companyEmail: '',
    phoneNumber: '',
  }

  handleChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  handleSubmit = event => {
    const to = this.props.yourEmail
    const subject = 'Contact Us Form Submission'

    const text = Object.keys(this.state).reduce((emailText, fieldName) => (
      this.props[camelCase('show '.concat(fieldName))]
        ? emailText.concat(`${titleCase(fieldName)}: ${this.state[fieldName]}\n`)
        : emailText
    ), '')

    axios.post(
      `http://ec2-18-222-103-218.us-east-2.compute.amazonaws.com:3000/email`,
      {
        to,
        subject,
        text,
      },
      {
        headers: {
          'Content-type': 'Application/json',
          'Accept': 'Application/json',
        }
      }
    )
    .then(emailServerResponse => {
      console.log('emailServerResponse:', emailServerResponse)
      if (emailServerResponse.status === 200) {
        this.props.handleDialogOpen(true)
      } else {
        this.props.handleDialogOpen(false)
      }
    })
    .catch(error => {
      console.log('error:', error)
      this.props.handleDialogOpen(false)
    })
  }

  render() {
    return (

        <div className='form'>
          <List>

            {
              Object.keys(this.state).map(fieldName => (
                this.props[camelCase('show '.concat(fieldName))]
                  ? (
                    <ListItem key={fieldName}>
                      <TextField
                        label={titleCase(fieldName)}
                        name={fieldName}
                        value={this.state[fieldName]}
                        onChange={this.handleChange(fieldName)}
                        className="textFields"
                      />
                    </ListItem>
                  )
                  : null
              ))
            }

            <ListItem>
              <Button variant='contained' onClick={this.handleSubmit}>
                Submit
              </Button>
            </ListItem>
            <div className='box'></div>
          </List>
      </div>
    )
  }
}

import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import Form from './Form'
import './index.css'

export default class ContactUs extends Component {
  state = {
    dialogOpen: false,
    emailSuccess: null,
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleDialogOpen = emailSuccess => {
    this.setState({
      dialogOpen: true,
      emailSuccess,
    })
  }

  render() {
    return (
      <div className='contact-wrapper'>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <Typography
          className='info-box'
          align='center'
          variant='subheading'
          gutterBottom
        >
          {this.props.information}
        </Typography>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
        >
          <DialogTitle>
            {
              this.state.emailSuccess
                ? 'We received your message!'
                : 'There was a problem. We did not receive your message.'
            }
          </DialogTitle>
          <Button onClick={this.handleDialogClose}>
            OK
          </Button>
        </Dialog>

        <Form
          handleDialogOpen={this.handleDialogOpen}
          { ...this.props }
        />

      </div>
    )
  }
}

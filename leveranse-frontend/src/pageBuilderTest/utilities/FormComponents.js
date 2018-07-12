import React from 'react'
import DatePicker from 'react-datepicker'
import { Checkbox, Container, Dropdown, Form, Input, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import 'moment/min/locales'
import 'react-datepicker/dist/react-datepicker.css'

moment.locale('nb')

const InlineError = ({text}) => (
  <span style={{color: '#db2828'}}>{text}</span>
)

export const editModeCheckbox = (readOnlyMode, action) => {
  return (
    <Container textAlign='right'>
      <Checkbox toggle checked={!readOnlyMode} onClick={action} icon='edit' label='Redigeringsmodus' />
    </Container>
  )
}

export const errorMessages = (errors, name) => {
  return (
    errors !== undefined && Object.keys(errors).length !== 0 && !Object.values(errors).every(i => (i === '')) ?
      <Message icon='warning' header={name + ' ble ikke lagret'} content={'Rett opp feilene og prøv igjen'}
               color='yellow' /> : null
  )
}

export const responseMessage = (response) => {
  return (
    response !== undefined ?
      Object.keys(response).length !== 0 ?
        <Message icon={response.icon} header={response.header} content={response.text}
                 color={response.color} /> : null : null
  )
}

export const formFieldTextArea = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <Form.TextArea autoHeight name={info.item} label={info.itemInNorwegian} placeholder={info.itemInNorwegian}
                     readOnly={info.readOnlyMode} onChange={action} value={value} />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const formFieldText = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      <Input name={info.item} placeholder={info.itemInNorwegian} readOnly={info.readOnlyMode} onChange={action}
             value={value} />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const formFieldDropdownSingle = (info, action, values) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      <Dropdown placeholder={info.itemInNorwegian} selection options={values} disabled={info.readOnlyMode}
                onChange={action} />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const formFieldDropdownMultiple = (info, action, values) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      <Dropdown placeholder={info.itemInNorwegian} multiple selection options={values} disabled={info.readOnlyMode}
                onChange={action} />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const formFieldDate = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      <DatePicker selected={value === '' ? null : value} onChange={action} dateFormat='DD/MM/YYYY'
                  placeholderText={info.itemInNorwegian} disabled={info.readOnlyMode} locale='nb' />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const formFieldBoolean = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <Checkbox label={info.itemInNorwegian} name={info.item} onChange={action} checked={value === '' ? false : value} />
    </Form.Field>
  )
}

//TODO: Add more form fields

InlineError.propTypes = {
  text: PropTypes.string.isRequired
}
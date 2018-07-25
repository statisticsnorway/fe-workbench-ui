import React from 'react'
import DatePicker from 'react-datepicker'
import { Checkbox, Container, Dropdown, Form, Icon, Input, Message, TextArea } from 'semantic-ui-react'
import * as moment from 'moment'
import 'moment/min/locales'
import 'react-datepicker/dist/react-datepicker.css'
import { enums } from './Enums'

moment.locale('nb')

const formField = (info, input) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      {input}
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const InlineError = ({text}) => (<span style={{color: '#db2828'}}>{text}</span>)

export const editModeCheckbox = (readOnlyMode, action) => {
  return (
    <Container fluid textAlign='right'>
      <Icon name={readOnlyMode ? 'lock' : 'lock open'} color={readOnlyMode ? 'red' : 'green'} />
      <Checkbox toggle checked={!readOnlyMode} onClick={action} icon='edit' label={enums.CONTENT.EDIT_MODE} />
    </Container>
  )
}

export const errorMessages = (errors, name) => {
  return (
    errors !== undefined && Object.keys(errors).length !== 0 && !Object.values(errors).every(i => (i === '')) ?
      <Message icon='warning' header={name + ' ' + enums.CONTENT.WAS_NOT_SAVED} content={enums.CONTENT.CORRECT_ERRORS}
               color='yellow' /> : null
  )
}

export const responseMessage = (response) => {
  return (
    response !== undefined ?
      Object.keys(response).length !== 0 ?
        <Message icon color={response.color}>
          <Icon name={response.icon} />
          <Message.Content>
            <Message.Header>{response.header}</Message.Header>
            <p>{response.text}</p>
            {typeof response.additionalText !== 'undefined' ? <p>{response.additionalText}</p> : null}
          </Message.Content>
        </Message> : null : null
  )
}

export const formFieldTextArea = (info, action, value, readOnlyMode) => {
  const input = <TextArea autoHeight name={info.item} placeholder={info.itemInNorwegian} readOnly={readOnlyMode}
                          onChange={action} value={value} />

  return formField(info, input)
}

export const formFieldText = (info, action, value) => {
  const input = <Input name={info.item} placeholder={info.itemInNorwegian} readOnly={info.readOnlyMode}
                       onChange={action} value={value} />

  return formField(info, input)
}

export const formFieldDropdownSingle = (info, action, values) => {
  const input = <Dropdown placeholder={info.itemInNorwegian} selection options={values} disabled={info.readOnlyMode}
                          onChange={action} />

  return formField(info, input)
}

export const formFieldDropdownMultiple = (info, action, values) => {
  const input = <Dropdown placeholder={info.itemInNorwegian} multiple selection options={values}
                          disabled={info.readOnlyMode} onChange={action} />

  return formField(info, input)
}

export const formFieldDate = (info, action, value) => {
  const input = <DatePicker selected={value === '' ? null : value} onChange={action} dateFormat='DD/MM/YYYY'
                            placeholderText={info.itemInNorwegian} disabled={info.readOnlyMode} locale='nb' />

  return formField(info, input)
}

export const formFieldBoolean = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <Checkbox label={info.itemInNorwegian} name={info.item} onChange={action}
                checked={value === '' ? false : value} disabled={info.readOnlyMode} />
    </Form.Field>
  )
}

export const formFieldNumber = (info, action, value) => {
  const input = <Input name={info.item} placeholder={info.itemInNorwegian} readOnly={info.readOnlyMode}
                       onChange={action} value={value} type='number' />

  return formField(info, input)
}

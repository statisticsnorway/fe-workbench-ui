import React from 'react'
import DatePicker from 'react-datepicker'
import { Checkbox, Container, Dropdown, Form, Icon, Input, Message, TextArea } from 'semantic-ui-react'
import * as moment from 'moment'
import 'moment/min/locales'
import 'react-datepicker/dist/react-datepicker.css'
import { enums } from './Enums'

moment.locale('nb')

export const InlineError = ({text}) => (
  <span style={{color: '#db2828'}}>{text}</span>
)

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
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      <TextArea autoHeight name={info.item} placeholder={info.itemInNorwegian} readOnly={readOnlyMode}
                onChange={action} value={value} />
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
      <Checkbox label={info.itemInNorwegian} name={info.item} onChange={action}
                checked={value === '' ? false : value} />
    </Form.Field>
  )
}

export const formFieldNumber = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      <Input name={info.item} placeholder={info.itemInNorwegian} readOnly={info.readOnlyMode} onChange={action}
             value={value} type='number' />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

export const formFieldSearchModal = (info, action, value) => {
  return (
    <Form.Field key={info.index} error={!!info.errors[info.item]}>
      <label>{info.itemInNorwegian}</label>
      {/*TODO Create the search modal*/}
      <Input name={info.item} placeholder={info.itemInNorwegian} readOnly={true} onChange={action} value={value}
             action={{color: 'teal', labelPosition: 'right', icon: 'search', content: enums.CONTENT.SEARCH}} />
      {info.errors[info.item] && <InlineError text={info.errors[info.item]} />}
    </Form.Field>
  )
}

//TODO: Add more form fields

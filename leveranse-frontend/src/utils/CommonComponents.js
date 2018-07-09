import React from 'react'
import { Checkbox, Container, Dropdown, Form, Input, Message } from 'semantic-ui-react'
import InlineError from '../pages/messages/InlineError'

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

//TODO: Add more form fields
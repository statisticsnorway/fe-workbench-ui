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
      <Message icon='warning' header={name + ' ble ikke lagret'} content={'Rett opp i feilene og prøv igjen'}
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

export const formFieldTextArea = (index, item, itemInNorwegian, readOnlyMode, errors, action, value) => {
  return (
    <Form.Field key={index} error={!!errors[item]}>
      <Form.TextArea autoHeight name={item} label={itemInNorwegian} placeholder={itemInNorwegian}
                     readOnly={readOnlyMode} onChange={action} value={value} />
      {errors[item] && <InlineError text={errors[item]} />}
    </Form.Field>
  )
}

export const formFieldText = (index, item, itemInNorwegian, readOnlyMode, errors, action, value) => {
  return (
    <Form.Field key={index} error={!!errors[item]}>
      <label>{itemInNorwegian}</label>
      <Input name={item} placeholder={itemInNorwegian} readOnly={readOnlyMode} onChange={action} value={value} />
      {errors[item] && <InlineError text={errors[item]} />}
    </Form.Field>
  )
}

export const formFieldDropdownSingle = (index, item, itemInNorwegian, readOnlyMode, errors, action, values) => {
  return (
    <Form.Field key={index} error={!!errors[item]}>
      <label>{itemInNorwegian}</label>
      <Dropdown placeholder={itemInNorwegian} selection options={values} disabled={readOnlyMode} onChange={action} />
      {errors[item] && <InlineError text={errors[item]} />}
    </Form.Field>
  )
}
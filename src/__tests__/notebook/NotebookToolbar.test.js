import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'
import NotebookToolbar from '../../pages/notebook/NotebookToolbar'
import dataset from '../test-data/DatasetWithStructure'
import { ContextProvider } from '../../context/ContextProvider'
import NotebookServiceMock from '../../services/NotebookServiceMock'
import { NOTEBOOK_TOOLBAR } from '../../utilities/enum/NOTEBOOK_TOOLBAR'
import { mapResult } from '../../services/graphql/DatasetQuery'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { getByText, getByTestId, getByPlaceholderText } = render(
    <ContextProvider>
      <NotebookToolbar dataset={mapResult(dataset)}/>
    </ContextProvider>
  )
  return { getByText, getByTestId, getByPlaceholderText }
}

describe('Test NotebookToolbar', () => {

  const spyGetNotes = jest.spyOn(NotebookServiceMock.prototype, 'getNotes')

  test('NotebookToolbar renders correctly', () => {
    const { getByText } = setup()
    expect(spyGetNotes).toHaveBeenCalledTimes(0)
    expect(getByText(NOTEBOOK_TOOLBAR.CREATE_NOTE_BUTTON.nb)).toBeDefined()
  })

  test('Should load notes after selecting createNote', () => {
    const { getByTestId, getByPlaceholderText } = setup()
    fireEvent.click(getByTestId('toggleCreateNote'))
    expect(spyGetNotes).toHaveBeenCalled()
    expect(getByPlaceholderText(NOTEBOOK_TOOLBAR.CREATE_NOTE_PLACEHOLDER.nb)).toBeDefined()
  })

  test('Should show message after creating a note', async () => {
    const spyPostNote = jest.spyOn(NotebookServiceMock.prototype, 'postNote')
    const { getByTestId, getByPlaceholderText, getByText } = setup()
    fireEvent.click(getByTestId('toggleCreateNote'))
    expect(spyGetNotes).toHaveBeenCalled()
    fireEvent.change(getByPlaceholderText(NOTEBOOK_TOOLBAR.CREATE_NOTE_PLACEHOLDER.nb), { target: { value: 'mynote' } })
    fireEvent.click(getByTestId('createNote'))
    expect(spyPostNote).toHaveBeenCalled()

    await waitForElement(() => getByText(NOTEBOOK_TOOLBAR.NOTE_LINK.nb))
    expect(getByText(NOTEBOOK_TOOLBAR.NOTE_LINK.nb)).toBeDefined()
  })

})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'
import { ContextProvider } from '../context/ContextProvider'
import NotebookAdmin from '../pages/prep_and_analysis/NotebookAdmin'
import NotebookServiceMock from '../services/NotebookServiceMock'
import { UI } from "../utilities/enum/UI"

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { queryAllByText, queryAllByRole, queryAllByPlaceholderText, getByText, queryAllByTestId } = render(
    <ContextProvider>
      <NotebookAdmin />
    </ContextProvider>)

  return { queryAllByText, queryAllByRole, queryAllByPlaceholderText, getByText, queryAllByTestId}
}

test('Notes list is parsed correctly', async () => {
  const spyGetNotes = jest.spyOn(NotebookServiceMock.prototype, 'getNotes')
  const { queryAllByText, queryAllByRole, queryAllByPlaceholderText } = setup()

  await expect(spyGetNotes).toHaveBeenCalled()

  expect(queryAllByPlaceholderText(UI.NOTE_CREATE_NEW.nb)).toHaveLength(1)

  expect(queryAllByRole('button')).toHaveLength(1)

  // Verify that both a folder and a note have been rendered
  expect(queryAllByText('Bank Tutorial')).toHaveLength(1)
  expect(queryAllByText('Zeppelin Tutorial')).toHaveLength(1)

  // Verify that trash has been rendered
  expect(queryAllByText('Trash')).toHaveLength(1)

  // Verify that folders are collapsed
  expect(queryAllByText('Test_div')).toHaveLength(0)

})

test('Delete and open is rendered on mouseover and not on mouseout', async () =>
{
  const { queryAllByTestId, getByText } = setup()
  let note = await waitForElement(() => getByText('Bank Tutorial'))
  expect(queryAllByTestId('deleteNote')).toHaveLength(0)
  expect(queryAllByTestId('openNote')).toHaveLength(0)
  fireEvent.mouseOver(note)
  expect(queryAllByTestId('deleteNote')).toHaveLength(1)
  expect(queryAllByTestId('openNote')).toHaveLength(1)
  fireEvent.mouseOut(note)
  expect(queryAllByTestId('deleteNote')).toHaveLength(0)
  expect(queryAllByTestId('openNote')).toHaveLength(0)
})

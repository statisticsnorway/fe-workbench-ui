import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { ContextProvider } from '../context/ContextProvider'
import NotebookAdmin from '../pages/prep_and_analysis/NotebookAdmin'
import NotebookServiceMock from '../services/NotebookServiceMock'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { queryAllByText, getByText, getByTestId } = render(
    <ContextProvider>
      <NotebookAdmin />
    </ContextProvider>)

  return { queryAllByText, getByText, getByTestId }
}

test('Notes list is parsed correctly', async () => {
  const spyGetNotes = jest.spyOn(NotebookServiceMock.prototype, 'getNotes')
  const { queryAllByText } = setup()

  await expect(spyGetNotes).toHaveBeenCalled()

  // Verify that root Note element is rendered (two instances because the page header has the same label pt)
  expect(queryAllByText('Notes')).toHaveLength(2)

  // Verify that root Note element is expanded
  expect(queryAllByText('Bank Tutorial')).toHaveLength(1)

  // Verify that sub elements are collapsed
  expect(queryAllByText('Test_div')).toHaveLength(0)

})

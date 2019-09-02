import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { ContextProvider } from '../context/ContextProvider'
import NotebookAdmin from '../pages/prep_and_analysis/NotebookAdmin'
import NotebookServiceMock from '../services/NotebookServiceMock'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { queryAllByText, queryAllByDisplayValue, queryAllByRole, queryAllByPlaceholderText } = render(
    <ContextProvider>
      <NotebookAdmin />
    </ContextProvider>)

  return { queryAllByText, queryAllByDisplayValue, queryAllByRole, queryAllByPlaceholderText }
}

test('Notes list is parsed correctly', async () => {
  const spyGetNotes = jest.spyOn(NotebookServiceMock.prototype, 'getNotes')
  const { queryAllByText, queryAllByRole, queryAllByPlaceholderText } = setup()

  await expect(spyGetNotes).toHaveBeenCalled()

  expect(queryAllByPlaceholderText('Create new Note')).toHaveLength(1)

  expect(queryAllByRole('button')).toHaveLength(1)

  // Verify that both a folder and a note have been rendered
  expect(queryAllByText('Bank Tutorial')).toHaveLength(1)
  expect(queryAllByText('Zeppelin Tutorial')).toHaveLength(1)

  // Verify that trash has been rendered
  expect(queryAllByText('Trash')).toHaveLength(1)

  // Verify that folders are collapsed
  expect(queryAllByText('Test_div')).toHaveLength(0)

})

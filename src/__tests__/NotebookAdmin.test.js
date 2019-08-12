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

test('Notebook list is parsed correctly', async () => {
  const spyGetNotebooks = jest.spyOn(NotebookServiceMock.prototype, 'getNotebooks')
  const { queryAllByText } = setup()

  await expect(spyGetNotebooks).toHaveBeenCalled()

  // Verify that root Notebook element is rendered (two instances because the page header has the same label pt)
  expect(queryAllByText('Notes')).toHaveLength(2)

  // Verify that root Notebook element is expanded
  expect(queryAllByText('Bank Tutorial')).toHaveLength(1)

  // Verify that sub elements are collapsed
  expect(queryAllByText('Test_div')).toHaveLength(0)

})

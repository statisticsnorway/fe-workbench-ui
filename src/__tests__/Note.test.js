import { cleanup, fireEvent, render } from "@testing-library/react"
import { ContextProvider } from "../context/ContextProvider"
import React from "react"
import Note from "../pages/prep_and_analysis/note/Note"
import NotebookServiceMock from "../services/NotebookServiceMock"

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { queryAllByText, getByTestId, queryAllByTestId} = render(
    <ContextProvider>
      <Note id='someid'/>
    </ContextProvider>)

  return { queryAllByText, getByTestId, queryAllByTestId }
}

test('Note is rendered correctly', async () => {
  const spyGetNote = jest.spyOn(NotebookServiceMock.prototype, 'getNote')
  const { queryAllByText, queryAllByTestId } = setup()

  await expect(spyGetNote).toHaveBeenCalled()
  expect(queryAllByText('Note: ABC')).toHaveLength(1)
  expect(queryAllByText('INGEN_TITTEL')).toHaveLength(3)
  expect(queryAllByTestId('runAllParagraphs')).toHaveLength(1)
})

test('Run button triggers method call', async () => {
  const spyStartJobs = jest.spyOn(NotebookServiceMock.prototype, 'startJobs')
  const spyGetNote = jest.spyOn(NotebookServiceMock.prototype, 'getNote')
  const { queryAllByText, getByTestId, queryAllByTestId } = setup()
  await expect(spyGetNote).toHaveBeenCalled()
  expect(queryAllByText('Note: ABC')).toHaveLength(1)

  fireEvent.click(getByTestId('runAllParagraphs'))
  expect(spyStartJobs).toHaveBeenCalled()
  expect(queryAllByTestId('runAllParagraphs')).toHaveLength(0)
})

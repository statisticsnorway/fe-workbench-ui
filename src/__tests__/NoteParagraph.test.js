import { cleanup, fireEvent, render } from "@testing-library/react"
import { ContextProvider } from "../context/ContextProvider"
import Note from '../__tests__/test-data/Note'
import React from "react"
import NoteParagraph from "../pages/prep_and_analysis/note/NoteParagraph"
import NotebookServiceMock from "../services/NotebookServiceMock"

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { queryAllByText, getByTestId } = render(
    <ContextProvider>
      <NoteParagraph noteId='someid' paragraph={Note.body.paragraphs[0]}/>
    </ContextProvider>)

  return { queryAllByText, getByTestId }
}

describe('Test Note Paragraph rendering and functionality', () => {

  test('Paragraph is rendered correctly', () => {
    const { queryAllByText } = setup()
    expect(queryAllByText('Resultat:')).toHaveLength(1)
    expect(queryAllByText('INGEN_TITTEL')).toHaveLength(1)
    expect(queryAllByText('It works from Arbeidsbenken.')).toHaveLength(1)
  })

  test('Click on code icon displays code', async () => {
    const { getByTestId, queryAllByText } = setup()
    fireEvent.click(getByTestId('showCode'))
    await expect(queryAllByText('%md It works from Arbeidsbenken.')).toHaveLength(1)
  })

  test('Click on run icon calls method for running paragraph', async () => {
    const spyRunParagraph = jest.spyOn(NotebookServiceMock.prototype, 'runParagraphSync')
    const { getByTestId } = setup()
    fireEvent.click(getByTestId('runParagraph'))
    expect(spyRunParagraph).toHaveBeenCalled()
  })

})

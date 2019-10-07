import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, act, wait } from '@testing-library/react'
import DatasetPreview from '../../pages/dataset/DatasetPreview'
import { ContextProvider } from '../../context/ContextProvider'
import { DATASET_PREVIEW } from '../../utilities/enum/DATASET_PREVIEW'

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  global.navigator.clipboard = mockClipBoard;
})

const mockClipBoard = {
  writeText: jest.fn().mockResolvedValue(true),
}

const setup = () => {
  const { getByTestId, getByRole, getByText, debug } = render(
    <MemoryRouter initialEntries={['/dataset/dummyId']}>
      <ContextProvider>
        <Route component={props => <DatasetPreview {...props} />} path="/dataset/:id"/>
      </ContextProvider>
    </MemoryRouter>
  )
  return { getByTestId, getByRole, getByText, debug }
}

// See andrewmcgov's comment in https://github.com/airbnb/enzyme/issues/2073
// This function is needed to wait for the component to finish rendering after receiving data from ldService
async function actWait(amount = 0) {
  await act(async () => {
    await wait(() => {}, {timeout: amount});
  });
}

describe('Test DatasetPreview', () => {
  test('DatasetPreview renders correctly', async () => {
    const { getByTestId, getByText } = setup()
    await actWait()
    expect(getByTestId('dataset-table')).toBeVisible()
    // Header columns
    expect(getByText(DATASET_PREVIEW.VARIABLE_TYPE['nb'])).toBeVisible()
    expect(getByText(DATASET_PREVIEW.VARIABLE_NAME['nb'])).toBeVisible()
    // Data rows
    expect(getByText('PERSON_ID')).toBeVisible()
    expect(getByText('INCOME')).toBeVisible()
    // Clickable ID label
    const idLabel = getByTestId('id-label')
    expect(idLabel).toBeVisible()
    expect(idLabel).toHaveStyle('cursor: pointer')

    fireEvent.click(idLabel)
    await wait(() => { expect(idLabel).toHaveStyle('cursor: copy') })
    expect(mockClipBoard.writeText).toHaveBeenCalled()
  })
})



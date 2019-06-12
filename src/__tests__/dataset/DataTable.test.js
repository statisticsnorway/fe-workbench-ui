import React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from '@testing-library/react'
import DataTable from '../../pages/dataset/DataTable'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const structure = {
    identifiers: [{ name: 'id' }],
    measures: [{ name: 'measure' }],
    attributes: [],
  }
  const data = [
    {
      'id': 'alpha',
      'measure': 42
    },
    {
      'id': 'gamma',
      'measure': 5
    },
  ]
  const onPageChange = jest.fn()
  const onSortChange = jest.fn()
  const { getByTestId, getByRole, getByText, debug } = render(
    <DataTable
      loading={false}
      totalCount={20}
      totalPages={2}
      currentPage={1}
      onPageChange={onPageChange}
      onSortChange={onSortChange}
      limit={10}
      sort={null}
      sortOrder={null}
      columns={structure} data={data}/>
  )

  return { getByTestId, getByRole, getByText, onPageChange, onSortChange, debug }
}

test('DataTable renders correctly', () => {
  const { getByTestId, getByText } = setup()
  expect(getByTestId('dataset-table')).toBeVisible()
  // Header columns
  expect(getByText('id')).toBeVisible()
  expect(getByText('measure')).toBeVisible()
  // Data rows
  expect(getByText('alpha')).toBeVisible()
  expect(getByText('gamma')).toBeVisible()
})

test('DataTable supports pagination', () => {
  const { onPageChange, getByRole } = setup()
  expect(getByRole('navigation')).toBeVisible()
  // Simulate click on 'nextItem'
  fireEvent.click(getByRole('navigation').children[5])
  expect(onPageChange).toHaveBeenCalled()
})

test('DataTable supports sorting', () => {
  const { onSortChange, getByText } = setup()
  // Simulate click on header column
  fireEvent.click(getByText('measure'))
  expect(onSortChange).toHaveBeenCalledWith('measure')
})


import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ContextProvider } from '../../context/ContextProvider'
import VariableItem from '../../pages/variable/VariableItem'

afterEach(() => {
  cleanup()
})

const setup = () => {
  const data = {
    "id": "b9c10b86-5867-4270-b56e-ee7439fe381e",
    'name': [
      {
        'languageCode': 'en',
        'languageText': 'Gender'
      }
    ],
    'description': [
      {
        'languageCode': 'en',
        'languageText': 'The person\'s gender'
      }
    ],
    'variable': {
      'subjectFields': {
        'edges': [
          {
            'node': {
              'name': [
                {
                  'languageCode': 'en',
                  'languageText': 'Population'
                }
              ]
            }
          }
        ]
      }
    }
  }
  const { queryAllByText } = render(
    <MemoryRouter>
      <ContextProvider>
        <VariableItem representedVariable={data}/>
      </ContextProvider>
    </MemoryRouter>)

  return { queryAllByText }
}

test('VariableItem is rendered correctly', async () => {
  const { queryAllByText } = setup()

  expect(queryAllByText('Gender')).toHaveLength(1)
  expect(queryAllByText('Population')).toHaveLength(1)
})

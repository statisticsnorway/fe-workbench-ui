import { cleanup } from '@testing-library/react'
import NotebookTree from '../../pages/notebook/NotebookTree'

afterEach(() => {
  cleanup()
})

describe('Test NotebookTree functions', () => {

  test('Get files sorted', () => {
    const filesAndFolders = {
      'body': [
        { name: 'B/a', id: 1 },
        { name: 'B/B', id: 2 },
        { name: 'B/c', id: 3 },
        { name: 'A', id: 4 },
      ]
    }
    const tree = new NotebookTree(filesAndFolders)
    expect(tree.files).toStrictEqual(
      [
        { name: 'A', id: 4 },
        { name: 'B/a', id: 1 },
        { name: 'B/B', id: 2 },
        { name: 'B/c', id: 3 }
      ])
  })

  test('Get sorted folders only', () => {
    const filesAndFolders = {
      'body': [
        { name: 'RootItem1', id: 1 },
        { name: 'RootItem2', id: 2 },
        { name: 'Folder1/SubItem2', id: 3 },
        { name: '/Folder1/SubItem1', id: 4 },
        { name: 'Folder1/Folder1_1/SubItem1_1', id: 5 },
        { name: 'Folder2/SubItem1', id: 6 }
      ]
    }
    const tree = new NotebookTree(filesAndFolders)
    expect(tree.folders).toStrictEqual([
      'Folder1',
      'Folder1/Folder1_1',
      'Folder2'])
  })

})
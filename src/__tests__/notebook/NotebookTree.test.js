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

  test('Get sorted tree', () => {
    const filesAndFolders = {
      'body': [
        { name: 'File1', id: 1 },
        { name: 'File2', id: 2 },
        { name: 'Folder1/SubItem2', id: 3 },
        { name: 'Folder1/SubItem1', id: 4 },
        { name: 'Folder1/Folder1_1/SubItem1_1', id: 5 },
        { name: 'Folder2/SubItem1', id: 6 }
      ]
    }
    const tree = new NotebookTree(filesAndFolders).tree
    expect(tree.map(node => node.name)).toStrictEqual([
      'Folder1',
      'Folder2',
      'File1',
      'File2'])

    expect(tree[0].children.map(node => node.name)).toStrictEqual([
      'Folder1_1',
      'SubItem1',
      'SubItem2'])
  })

  test('Add element to tree and return a sorted tree', () => {
    const filesAndFolders = {
      'body': [
        { name: 'File1', id: 1 },
        { name: 'File2', id: 2 },
        { name: 'Folder1/SubItem2', id: 3 },
        { name: 'Folder1/SubItem1', id: 4 },
        { name: 'Folder1/Folder1_1/SubItem1_1', id: 5 },
        { name: 'Folder2/SubItem1', id: 6 }
      ]
    }
    const notebookTree = new NotebookTree(filesAndFolders)
    notebookTree.addElement({ name: 'Folder1/SubItem3', id: 7 })
    const tree = notebookTree.tree

    expect(tree.map(node => node.name)).toStrictEqual([
      'Folder1',
      'Folder2',
      'File1',
      'File2'])

    expect(tree[0].children.map(node => node.name)).toStrictEqual([
      'Folder1_1',
      'SubItem1',
      'SubItem2',
      'SubItem3'])
  })

  test('Find element in tree', () => {
    const filesAndFolders = {
      'body': [
        { name: 'File1', id: 1 },
        { name: 'Folder1/SubItem2', id: 3 },
      ]
    }
    const tree = new NotebookTree(filesAndFolders)
    expect(tree.findElement(e => e.id === 1).name).toEqual('File1')
    expect(tree.findElement(e => e.id === 99)).toBeNull()
  })

  test('Delete element from tree', () => {
    const filesAndFolders = {
      'body': [
        { name: 'File1', id: 1 },
        { name: 'File2', id: 2 },
        { name: 'Folder1/SubItem1', id: 3 },
        { name: 'Folder1/SubItem2', id: 4 },
        { name: 'Folder2/SubFolder1/SubItem1', id: 5 },
      ]
    }
    const notebookTree = new NotebookTree(filesAndFolders)
    notebookTree.removeElement(99) // Should not fail
    notebookTree.removeElement(2)
    const tree = notebookTree.tree
    expect(tree.map(node => node.name)).toStrictEqual([
      'Folder1',
      'Folder2',
      'File1'])
    notebookTree.removeElement(3, tree)
    expect(tree.map(node => node.name)).toStrictEqual([
      'Folder1',
      'Folder2',
      'File1'])
    notebookTree.removeElement(4, tree)
    expect(tree.map(node => node.name)).toStrictEqual([
      'Folder2',
      'File1'])
    notebookTree.removeElement(5, tree)
    expect(tree.map(node => node.name)).toStrictEqual([
      'File1'])
  })

})
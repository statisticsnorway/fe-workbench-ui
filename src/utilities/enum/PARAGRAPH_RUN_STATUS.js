import { NOTEBOOK_TOOLBAR } from "./NOTEBOOK_TOOLBAR"

export const PARAGRAPH_RUN_STATUS = {
  SUCCESS: {
    icon: 'circle',
    color: 'green',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_SUCCESS,
    loading: false
  },
  ERROR: {
    icon: 'circle',
    color: 'red',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_ERROR,
    loading: false
  },
  READY: {
    icon: 'circle outline',
    color: 'green',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_READY,
    loading: false
  },
  RUNNING: {
    icon: 'circle notch',
    color: 'blue',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_RUNNING,
    loading: true
  },
  FINISHED: {
    icon: 'circle',
    color: 'blue',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_FINISHED,
    loading: true
  }
}
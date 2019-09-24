import { NOTEBOOK_TOOLBAR } from "./NOTEBOOK_TOOLBAR"

export const PARAGRAPH_RUN_STATUS = {
  UNKNOWN: {
    icon: 'question circle',
    color: 'olive',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_UNKNOWN,
    loading: false
  },
  READY: {
    icon: 'circle outline',
    color: 'green',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_READY,
    loading: false
  },
  PENDING: {
    icon: 'wait',
    color: 'blue',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_PENDING,
    loading: true
  },
  RUNNING: {
    icon: 'circle notch',
    color: 'blue',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_RUNNING,
    loading: true
  },
  FINISHED: {
    icon: 'circle',
    color: 'green',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_FINISHED,
    loading: false
  },
  SUCCESS: {
    icon: 'circle',
    color: 'green',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_FINISHED,
    loading: false
  },
  ERROR: {
    icon: 'circle',
    color: 'red',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_ERROR,
    loading: false
  },
  ABORT: {
    icon: 'times circle outline',
    color: 'red',
    text: NOTEBOOK_TOOLBAR.PARAGRAPH_STATUS_ABORT,
    loading: false
  }
}
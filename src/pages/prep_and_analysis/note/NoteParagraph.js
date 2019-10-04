import React, { Fragment, useContext, useState } from "react"
import { Accordion, Icon } from "semantic-ui-react"
import { NOTEBOOK_TOOLBAR as Notes_text } from "../../../utilities/enum/NOTEBOOK_TOOLBAR"
import { WorkbenchContext } from "../../../context/ContextProvider"
import { PARAGRAPH_RUN_STATUS as Status_text } from "../../../utilities/enum/PARAGRAPH_RUN_STATUS"
import { NOTIFICATION_TYPE } from "../../../utilities/enum/NOTIFICATION_TYPE"
import { UI } from "../../../utilities/enum/UI"

const NoteParagraph = (props) => {
  const context = useContext(WorkbenchContext)
  const [ displayCode, setDisplayCode ] = useState(false)
  const [ active, setActive ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ paragraph, setParagraph ] = useState(props.paragraph)
  const { noteId, user } = props

  const runParagraph = () => {

    setLoading(true)
    context.notebookService.runParagraphSync(noteId, paragraph.id, user)
      .then( result => {
        if (result.status === 'OK') {
          loadParagraph()
        } else {
          context.setNotification(true, NOTIFICATION_TYPE.ERROR,
            context.getLocalizedText(UI.GENERIC_ERROR) + ' - ' + result.status)
        }
      })
      .catch( () => {
        // Zeppelin returns 500 if a paragraph fails due to error in the code. This should not
        // be presented to the user as an application error. The paragraph result will display the error
        loadParagraph()
      })
  }

  const loadParagraph = () => {
    context.notebookService.getParagraph(noteId, paragraph.id, user)
      .then( result => {
        setLoading(false)
        if (result.status === 'OK') {
          setParagraph(result.body)
        } else {
          context.setNotification(true, NOTIFICATION_TYPE.ERROR,
            context.getLocalizedText(UI.GENERIC_ERROR) + ' - ' + result.status)
        }
      })
      .catch( error => {
        context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text)
      })
  }

  const stopParagraph = () => {
    context.notebookService.stopParagraph(noteId, paragraph.id, user)
      .then( result => {
        if (result.status === 'OK') {
          loadParagraph()
        } else {
          context.setNotification(true, NOTIFICATION_TYPE.ERROR,
            context.getLocalizedText(UI.GENERIC_ERROR) + ' - ' + result.status)
        }
      })
      .catch( error => {
        context.setNotification(true, NOTIFICATION_TYPE.ERROR, error.text)
        loadParagraph()
      })
  }

  const handleAccordionClick = (e) => {
    // prevent accordion to be opened/closed when clicking action buttons
    if (e.target.parentElement.id !== 'donotexpand') {
      setActive(!active)
    }
  }

  const ResultComponent = (resultElement) => {
    switch (resultElement.resultElement.type) {
      case 'HTML': {
        return (<span dangerouslySetInnerHTML={{__html: resultElement.resultElement.data}}/>)
      }
      case 'TABLE' : {
        return (<pre>{resultElement.resultElement.data}</pre>)
      }
      default: {}
      /* falls through */
      case 'TEXT': {
        return (<pre>{resultElement.resultElement.data}</pre>)
      }
    }
  }

  // TODO set max height for paragaph result
  return (
    <Accordion fluid>
      <Fragment key={paragraph.id}>
        <Accordion.Title active={active} onClick={handleAccordionClick}>
          <Icon name='dropdown'/>
          <Icon name={paragraph.results ? Status_text[paragraph.results.code].icon : Status_text[paragraph.status].icon}
                color={paragraph.results ? Status_text[paragraph.results.code].color : Status_text[paragraph.status].color}
                title={paragraph.results ? context.getLocalizedText(Status_text[paragraph.results.code].text)
                  : context.getLocalizedText(Status_text[paragraph.status].text)}
                loading={Status_text[paragraph.status].loading}/>
          <span style={{paddingRight: '5px'}}>{paragraph.title === undefined ? 'INGEN_TITTEL' : paragraph.title}</span>
          <span id='donotexpand'>
            {loading ?
              <Icon name='pause' color='grey' title={context.getLocalizedText(Notes_text.PARAGRAPH_ABORT)}
                    onClick={stopParagraph}/>
              :
              <Icon name='play' color='green' title={context.getLocalizedText(Notes_text.PARAGRAPH_RUN)}
                    onClick={runParagraph} data-testid='runParagraph'/>
            }
        </span>
        </Accordion.Title>
        <Accordion.Content active={active} style={{marginLeft: '20px', marginRight: '-20px'}}>
          <div>
            <div>
              <strong>{context.getLocalizedText(Notes_text.PARAGRAPH_RESULT)}:</strong>
              <Icon name='file code outline' onClick={() => setDisplayCode(!displayCode)}
                    style={{cursor: 'pointer', paddingLeft: '10px'}}
                    title={context.getLocalizedText(displayCode ?
                      Notes_text.PARAGRAPH_HIDE_CODE : Notes_text.PARAGRAPH_SHOW_CODE)}
                    data-testid='showCode'
              />
              {displayCode && <div style={{background: 'lightgray'}}><pre>{paragraph.text}</pre></div>}
              <div style={{overflow: 'auto', maxHeight: '25vh', border: '1px dashed'}}>
                {paragraph.results && paragraph.results.msg.map((element, index) =>
                  <ResultComponent resultElement={element} key={paragraph.id + '_' + index}/>)}
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Fragment>
    </Accordion>
  )
}

export default NoteParagraph
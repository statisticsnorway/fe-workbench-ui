export const COLLECTION_UI = {
  COLLECTION_HEADER: {
    en: 'Collection administration',
    nb: 'Innsamlingsadministrasjon'
  },
  COLLECTORS: {
    en: 'Collectors',
    nb: 'Innsamlinger'
  },
  COLLECTOR: {
    en: 'Collector',
    nb: 'Innsamler'
  },
  CONVERTER: {
    en: 'Converter',
    nb: 'Konverterer'
  },
  START: {
    en: 'Start',
    nb: 'Start'
  },
  STOP: {
    en: 'Stop',
    nb: 'Stopp'
  },
  BUTTON_START_COLLECTOR_FROM_BEGINNING: {
    label: {
      en: 'Start from beginning',
      nb: 'Start fra begynnelsen'
    },
    hint: {
      en: 'Start collector from beginning',
      nb: 'Start innsamling fra begynnelsen'
    }
  },
  BUTTON_PAUSE_COLLECTOR: {
    label: {
      en: 'Pause',
      nb: 'Paus'
    },
    hint: {
      en: 'Pause collection',
      nb: 'Pause innsamling'
    }
  },
  BUTTON_START_COLLECTOR_FROM_LAST: {
    label: {
      en: 'Start from last',
      nb: 'Start fra forrige'
    },
    hint: {
      en: 'Start collector from last',
      nb: 'Start innsamling fra forrige'
    }
  },
  BUTTON_STOP_COLLECTOR: {
    label: {
      en: 'Stop',
      nb: 'Stopp'
    },
    hint: {
      en: 'Stop collection',
      nb: 'Stopp innsamling'
    }
  },
  BUTTON_START_CONVERTER: {
    label: {
      en: 'Start',
      nb: 'Start'
    },
    hint: {
      en: 'Start converter',
      nb: 'Stopp konvertering'
    }
  },
  BUTTON_STOP_CONVERTER: {
    label: {
      en: 'Stop',
      nb: 'Stopp'
    },
    hint: {
      en: 'Stop converter',
      nb: 'Stopp konvertering'
    }
  },
  NUMBER_CONVERTED: {
    en: 'Number converted',
    nb: 'Antall konverterte'
  },
  NUMBER_FAILED: {
    en: 'Number failed',
    nb: 'Antall feilet'
  },
  ENVIRONMENT: {
    en: 'environment',
    nb: 'miljø'
  },
  GUI_UPDATE_INTERVAL: {
    en: 'update interval',
    nb: 'oppdateringsinterval'
  }

}

export const COLLECTORS = {
  FREG: {
    id: 1,
    name: {
      en: 'FREG',
      nb: 'FREG'
    },
    converterUrl: {
      staging: '/be/rawdata-converter-freg',
      development: 'http://localhost:18081/freg'
    },
    collectorSpec: 'skeFregPlaygroundSpec'
  },
  SKATT: {
    id: 2,
    name: {
      en: 'Sirius',
      nb: 'Sirius'
    },
    converterUrl: {
      staging: '/be/rawdata-converter-sirius',
      development: 'http://localhost:18083/sirius'
    },
    collectorSpec: 'skeSiriusPersonFastsattSpec'
  },
  TVINN: {
    id: 3,
    name: {
      en: 'Tvinn',
      nb: 'Tvinn'
    },
    converterUrl: {
      staging: '/be/rawdata-converter-tvinn',
      developmnet: 'http://localhost:18085/tvinn'
    },
    collectorSpec: 'tollTvinnTestSpec'
  }
}

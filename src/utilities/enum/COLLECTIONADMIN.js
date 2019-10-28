export const COLLECTION_UI = {
  COLLECTION_HEADER: {
    en: 'Collection administration',
    nb: 'Innsamlingsadministrasjon'
  },
  COLLECTORS: {
    en: 'Collectors',
    nb: 'Innsamlinger'
  },
  BUTTON_START_COLLECTOR_FROM_BEGINNING: {
    label: {
      en: 'Start collector from beginning',
      nb: 'Start innsamling fra begynnelsen'
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
      en: 'Start from last',
      nb: 'Start fra forrige'
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
      en: 'Start converter',
      nb: 'Start konvertering'
    },
    hint: {
      en: 'Start converter',
      nb: 'Stopp konvertering'
    }
  },
  BUTTON_STOP_CONVERTER: {
    label: {
      en: 'Stop converter',
      nb: 'Stopp konvertering'
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
      staging: 'https://rawdata-converter-app-freg.staging-bip-app.ssb.no/',
      develop: 'http://localhost:18081'
    },
    collectorSpec: 'skeFregPlaygroundSpec'
  },
  SKATT: {
    id: 2,
    name: {
      en: 'Skatteetaten.',
      nb: 'Skatteetaten'
    },
    converterUrl: {
      staging: 'https://rawdata-converter-app-sirius.staging-bip-app.ssb.no',
      develop: 'http://localhost:18083'
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
      staging: 'https://rawdata-converter-app-tvinn.staging-bip-app.ssb.no',
      develop: 'http://localhost:18085'
    },
    collectorSpec: 'tollTvinnTestSpec'
  }
}

export const nodes = [
  {
    "id": "b9c10b86-5867-4270-b56e-ee7439fe381e",
    "label": "PersonWithIncomeDataset",
    "type": "UnitDataset"
  },
  {
    "id": "d7f1a566-b906-4561-92cb-4758b766335c",
    "label": "FamilyDataset",
    "type": "UnitDataset"
  },
  {
    "id": "1",
    "label": "Utledet datasett",
    "type": "UnitDataset"
  },
  {
    "id": "2",
    "label": "Klargjort dataset_1",
    "type": "UnitDataset"
  },
  {
    "id": "3",
    "label": "Klargjort dataset_2",
    "type": "UnitDataset"
  }
]

export const edges = [
  {
    "from": "b9c10b86-5867-4270-b56e-ee7439fe381e",
    "to": "d7f1a566-b906-4561-92cb-4758b766335c"
  },
  {
    "from": "d7f1a566-b906-4561-92cb-4758b766335c",
    "to": "1"
  },
  {
    "from": "1",
    "to": "2"
  },
  {
    "from": "1",
    "to": "3"
  }
]
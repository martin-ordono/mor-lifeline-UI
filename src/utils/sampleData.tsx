import { Category } from "../models/category";
import { Entry } from "../models/entry";

export const categoryList: Category[] = [
    {
      id: 1,
      name: 'Workout',
      description: 'Entrenamiento',
      isNumeric: false,
      isStr: false
    },
    {
      id: 2,
      name: 'Run',
      description: 'KMs run',
      isNumeric: true,
      isStr: false
    },
    {
      id: 3,
      name: 'Alcohol',
      description: 'Drink alcohol at some point',
      isNumeric: false,
      isStr: false
    },
    {
      id: 4,
      name: 'Work',
      description: 'Trabajo',
      isNumeric: false,
      isStr: false
    },
    {
      id: 5,
      name: 'Pelicula',
      description: 'Pelicula vista',
      isNumeric: false,
      isStr: true
    }
  ];

export const sampleWeek: Entry[] = [
  {
    date: 20250201,
    category: categoryList[0]
  },
  {
    date: 20250202,
    category: categoryList[1],
    valueNum: 5
  },
  {
    date: 20250203,
    category: categoryList[2]
  },
  {
    date: 20250204,
    category: categoryList[3]
  },
  {
    date: 20250205,
    category: categoryList[4],
    valueStr: "La La Land"
  },
  {
    date: 20250206,
    category: categoryList[0]
  },
  {
    date: 20250207,
    category: categoryList[1],
    valueNum: 10
  }
];

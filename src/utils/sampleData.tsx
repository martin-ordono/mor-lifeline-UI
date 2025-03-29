import { Category } from "../models/category";
import { Entry } from "../models/entry";

export const categoryList: Category[] = [
    {
      id: 1,
      name: 'Workout',
      description: 'Entrenamiento',
      isNumeric: false,
      isStr: false,
      color: '#FF0000'
    },
    {
      id: 2,
      name: 'Sick',
      description: '',
      isNumeric: true,
      isStr: false,
      color: '#00FF00'
    },
    {
      id: 3,
      name: 'Party',
      description: '',
      isNumeric: false,
      isStr: false,
      color: '#0000FF'
    },
    {
      id: 4,
      name: 'Work',
      description: 'Trabajo',
      isNumeric: false,
      isStr: false,
      color: '#FFFF00'
    },
    {
      id: 5,
      name: 'Movie',
      description: 'Pelicula vista',
      isNumeric: false,
      isStr: true,
      color: '#FF00FF'
    }
  ];

export const sampleData: Entry[] = [
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
    date: 20250206,
    category: categoryList[0]
  },
  {
    date: 20250207,
    category: categoryList[1],
    valueNum: 10
  },
  {
    date: 20250208,
    category: categoryList[2]
  },
  {
    date: 20250209,
    category: categoryList[3]
  },
  {
    date: 20250210,
    category: categoryList[4],
    valueStr: "Inception"
  },
  {
    date: 20250211,
    category: categoryList[0]
  },
  {
    date: 20250212,
    category: categoryList[1],
    valueNum: 15
  },
  {
    date: 20250213,
    category: categoryList[2]
  },
  {
    date: 20250216,
    category: categoryList[0]
  },
  {
    date: 20250217,
    category: categoryList[1],
    valueNum: 20
  },
  {
    date: 20250219,
    category: categoryList[3]
  },
  {
    date: 20250220,
    category: categoryList[4],
    valueStr: "Interstellar"
  },
  {
    date: 20250221,
    category: categoryList[0]
  },
  {
    date: 20250222,
    category: categoryList[1],
    valueNum: 25
  },
  {
    date: 20250224,
    category: categoryList[3]
  },
  {
    date: 20250225,
    category: categoryList[4],
    valueStr: "The Godfather"
  },
  {
    date: 20250226,
    category: categoryList[0]
  },
  {
    date: 20250227,
    category: categoryList[1],
    valueNum: 30
  },
  {
    date: 20250229,
    category: categoryList[3]
  },
  {
    date: 20250301,
    category: categoryList[4],
    valueStr: "The Dark Knight"
  },
  {
    date: 20250302,
    category: categoryList[0]
  },
  {
    date: 20250303,
    category: categoryList[1],
    valueNum: 35
  },
  {
    date: 20250304,
    category: categoryList[2]
  },
  {
    date: 20250305,
    category: categoryList[3]
  },
  {
    date: 20250306,
    category: categoryList[4],
    valueStr: "Pulp Fiction"
  },
  {
    date: 20250307,
    category: categoryList[0]
  },
  {
    date: 20250308,
    category: categoryList[1],
    valueNum: 40
  },
  {
    date: 20250310,
    category: categoryList[3]
  },
  {
    date: 20250311,
    category: categoryList[4],
    valueStr: "Fight Club"
  }
];

export function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
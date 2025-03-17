import { Category } from "../models/category";
import { Display } from "../models/display";

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

export const sampleWeek: Display = {
    data: [
        {
            id: 1,
            name: 'Workout',
            description: 'Entrenamiento',
            isNumeric: false,
            isStr: false,
            entries: [
                {
                    date: 20250316
                },
                {
                    date: 20250317
                },
                {
                    date: 20250318
                },
                {
                    date: 20250319
                },
                {
                    date: 20250320
                },
                {
                    date: 20250321
                },
                {
                    date: 20250322
                }
            ]
        }
    ]
};
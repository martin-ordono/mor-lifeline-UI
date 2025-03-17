
import { Box, Stack } from '@chakra-ui/react';
import EntryModal from './components/Entry/EntryModal';
import { Category } from './models/category';

import './App.css';
import CategoryModal from './components/Category/CategoryModal';
import { useState } from 'react';
import { categoryList, sampleWeek } from './utils/sampleData';
import { Display, DisplayCategory } from './models/display';
import { Entry } from './models/entry';

function App() {
    const [categories, setCategories] = useState<Category[]>(categoryList);
    const [display, setDisplay] = useState<Display>(sampleWeek);

    const addCategory = (category: Category) => {
        setCategories([...categories, category]);
    };

    const handleEntryChange = (entry: Entry, remove?: boolean) => {
        console.log(entry);
        const category = display.data.find((category) => category.id === entry.category);
        if (category) {
          const exist = category.entries.find((e) => e.date === entry.date);

          // If the entry exists and we want to remove it, we remove it
          if(remove && exist) {
            const newEntries = category.entries.filter((e) => e.date !== entry.date);
            const newDisplay = {
              ...display,
              data: display.data.map((c) => {
                if(c.id === category.id) {
                  return {
                    ...c,
                    entries: newEntries
                  }
                }
                return c;
              })
            }
            setDisplay(newDisplay);
          } else if(!remove && exist) { // If the entry exists and we want to add it, we update it
            const newEntries = category.entries.map((e) => {
              if(e.date === entry.date) {
                return entry;
              }
              return e;
            });
            const newDisplay = {
              ...display,
              data: display.data.map((c) => {
                if(c.id === category.id) {
                  return {
                    ...c,
                    entries: newEntries
                  }
                }
                return c;
              })
            }
            setDisplay(newDisplay);
          } else if(!exist && !remove) { // If the entry doesn't exist and we want to add it
            const newDisplay = {
              ...display,
              data: display.data.map((c) => {
                if(c.id === category.id) {
                  return {
                    ...c,
                    entries: [
                      ...c.entries,
                      entry
                    ]
                  }
                }
                return c;
              })
            }
            setDisplay(newDisplay
            );
          }

        } else if(!remove) {
          const newCategory = categories.find((category) => category.id === entry.category) as DisplayCategory;
          if (newCategory) {
            const newDisplay = {
              ...display,
              data: [
                ...display.data,
                {
                  ...newCategory,
                  entries: [entry]
                }
              ]
            }
            setDisplay(newDisplay);
          } 
        }
    }
  

  return (
    <Box width="100%" height="100%" p={2} >
      <Stack>
        
      <CategoryModal onSubmit={addCategory} />
      <EntryModal onChange={handleEntryChange} categories={categories} />
      </Stack>
    </Box>
  )
}

export default App

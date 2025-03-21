
import { Center, Flex, Stack } from '@chakra-ui/react';
import EntryModal from './components/Entry/EntryModal';
import { Category } from './models/category';

import { useState } from 'react';
import './App.css';
import CategoryModal from './components/Category/CategoryModal';
import YearDisplay from './components/Display/Calendar/YearDisplay';
import { Entry } from './models/entry';
import { categoryList, sampleWeek } from './utils/sampleData';

function App() {
    const [categories, setCategories] = useState<Category[]>(categoryList);
    const [data, setData] = useState<Entry[]>(sampleWeek);

    const addCategory = (category: Category) => {
        setCategories([...categories, category]);
    };

    const handleEntryChange = (entry: Entry, remove?: boolean) => {
      const entryCount = data.length;
      console.log("prev count", entryCount);
      
      const existing = data.filter((e) => e.date === entry.date && e.category.id === entry.category.id);
      if (existing.length > 0) {
        if (remove) {
          const newDisplay = data.filter((e) => e.date !== entry.date || e.category.id !== entry.category.id);
          setData(newDisplay);
        } else {
          const newDisplay = data.map((e) => {
            if (e.date === entry.date && e.category.id === entry.category.id) {
              return entry;
            } else {
              return e;
            }
          });
          setData(newDisplay);
        }
      } else {
        setData([...data, entry]);
      }
      
    }

    const handleDayClick = (date: number) => {
      console.log("Day clicked", date);
    }
  

  return (
    <Flex width="100%" height="100%" p={2}>
      <Stack height={"100%"} borderRight={"1px"} borderColor={"gray.200"} p={2} >
        <CategoryModal onSubmit={addCategory} />
        <EntryModal onChange={handleEntryChange} categories={categories} data={data} />
      </Stack>
      <Center width={"100%"} height={"100%"}>
        <YearDisplay data={data} onDayClick={handleDayClick} />
      </Center>
    </Flex>
  )
}

export default App


import { Center, Flex, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CategoryModal from './components/Category/CategoryModal';
import YearDisplay from './components/Display/Calendar/YearDisplay';
import EntryModal from './components/Entry/EntryModal';
import { Category } from './models/category';
import { Entry } from './models/entry';
import { formatDateIntoNum, parseNumberToDate } from './utils/dateUtils';
import { categoryList, sampleWeek } from './utils/sampleData';

import './App.css';
import { ColorModeButton } from './components/ui/color-mode';
import { createCategory, getAll } from './api/categoryApi';
import { getEntriesBbyYear } from './api/entryApi';

function App() {
    const [categories, setCategories] = useState<Category[]>(categoryList);
    const [data, setData] = useState<Entry[]>(sampleWeek);
    const [selectedDate, setSelectedDate] = useState<number>(formatDateIntoNum(new Date()));

    
    useEffect(() => {
        // get categories
        getAll().then((categories) => {
          setCategories(categories);
        });
        // get entries
        const currentYear = parseNumberToDate(selectedDate).getFullYear();
        getEntriesBbyYear(currentYear).then((entries) => {
          setData(entries);
        });
    }, []); // empty dependency array to run once on mount

    const addCategory = (category: Category) => {
      console.log("adding category", category);
      createCategory(category).then((newCategory) => {
        setCategories([...categories, newCategory]);
      });
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
      setSelectedDate(date);
    }
  

  return (
    <Flex
      width="100%"
      height="100%"
      p={2}
    >
      <Stack height={"100%"} borderRight={"1px"} borderColor={"gray.200"} p={2} >
        <CategoryModal onSubmit={addCategory} />
        <EntryModal
          onChange={handleEntryChange}
          categories={categories}
          data={data}
          date={selectedDate}
          setDate={setSelectedDate}
        />
        <ColorModeButton />
      </Stack>
      <Center width={"100%"} height={"100%"}>
        <YearDisplay data={data} categories={categories} onDayClick={handleDayClick} />
      </Center>
    </Flex>
  )
}

export default App

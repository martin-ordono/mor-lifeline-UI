
import { Center, Flex, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createCategory, getAll } from './api/categoryApi';
import { getEntriesBbyYear } from './api/entryApi';
import CategoryModal from './components/Category/CategoryModal';
import YearDisplay from './components/Display/Calendar/YearDisplay';
import EntryModal from './components/Entry/EntryModal';
import { ColorModeButton } from './components/ui/color-mode';
import { Category } from './models/category';
import { Entry } from './models/entry';
import { formatDateIntoNum, parseNumberToDate } from './utils/dateUtils';

import './App.css';

function App() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [selectedDate, setSelectedDate] = useState<number>(formatDateIntoNum(new Date()));

    
    useEffect(() => {
        // get categories
        getAll().then((categories) => {
          setCategories(categories);
        });

        // get entries
        const currentYear = parseNumberToDate(selectedDate).getFullYear();
        getEntriesBbyYear(currentYear).then((entries) => {
          setEntries(entries);
        });
    }, []); // empty dependency array to run once on mount

    const addCategory = (category: Category) => {
      createCategory(category).then((newCategory) => {
        setCategories([...categories, newCategory]);
      });
    };

    const handleEntryChange = (entry: Entry, remove?: boolean) => {      
      const existing = entries.filter((e) => e.date === entry.date && e.category.id === entry.category.id);
      if (existing.length > 0) {
        if (remove) {
          const newList = entries.filter((e) => e.date !== entry.date || e.category.id !== entry.category.id);
          setEntries(newList);
        } else {
          const newList = entries.map((e) => {
            if (e.date === entry.date && e.category.id === entry.category.id) {
              return entry;
            } else {
              return e;
            }
          });
          setEntries(newList);
        }
      } else {
        setEntries([...entries, entry]);
      }
      
    }

    const changeYear = (year: number) => {
      setSelectedDate(formatDateIntoNum(new Date(year, 0, 1)));
      getEntriesBbyYear(year).then((entries) => {
        setEntries(entries);
      });
    }

    const props = {
      categories,
      entries,
      selectedDate,
      changeYear,
      setSelectedDate,
      handleEntryChange
    };
  

  return (
    <Flex
      width="100%"
      height="100%"
      p={2}
    >
      <Stack height={"100%"} borderRight={"1px"} borderColor={"gray.200"} p={2} >
        <CategoryModal onSubmit={addCategory} />
        <EntryModal props={props} />
        <ColorModeButton />
      </Stack>
      <Center width={"100%"} height={"100%"}>
        <YearDisplay props={props} />
      </Center>
    </Flex>
  )
}

export default App

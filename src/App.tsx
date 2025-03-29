
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createCategoryDemo, getAllCategoriesDemo } from './api/categoryApi';
import { getAllEntriesDemo, getEntriesBbyYear } from './api/entryApi';
import EntryModal from './components/SideMenu/Entry/EntryModal';
import { ColorModeButton } from './components/ui/color-mode';
import { Category } from './models/category';
import { Entry } from './models/entry';
import { formatDateIntoNum } from './utils/dateUtils';

import './App.css';
import DisplayWrapper from './components/Display/DisplayWrapper';
import CategoryModal from './components/SideMenu/Category/CategoryModal';

function App() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [selectedDate, setSelectedDate] = useState<number>(formatDateIntoNum(new Date()));


    useEffect(() => {
        // get categories
        getAllCategoriesDemo().then((categories) => {
          setCategories(categories);
        });

        // get entries
        getAllEntriesDemo().then((entries) => {
          setEntries(entries);
        });
    }, []); // empty dependency array to run once on mount

    const addCategory = (category: Category) => {
      createCategoryDemo(category).then((newCategory) => {
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
      p={2}
      height={"100%"}
    >
      <Stack height={"100%"} borderRight={"1px solid"} borderColor={"gray.700"} p={2} >
        <CategoryModal onSubmit={addCategory} />
        <EntryModal props={props} />
        <ColorModeButton />
      </Stack>
      <Box height="100%" w={"100%"} p={2}>
        <DisplayWrapper props={props} />
      </Box>
    </Flex>
  )
}

export default App

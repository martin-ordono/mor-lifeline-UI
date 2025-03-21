import { defaultConfig } from "@chakra-ui/react"
import { createSystem, defineConfig } from "@chakra-ui/react/styled-system"

const config = defineConfig({
    globalCss: {
      html: {
        //colorPalette: "purple", // Change this to any color palette you prefer
        borderColor: "gray.200",
      },
    },
  })
  
  export const system = createSystem(defaultConfig, config)
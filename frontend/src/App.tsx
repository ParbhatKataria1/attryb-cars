import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import PublicRoutes from "./Components/PublicRoutes";

function App() {
  return (
    <Box>
        <Navbar/>
        <PublicRoutes />
      </Box>
  );
}

export default App;

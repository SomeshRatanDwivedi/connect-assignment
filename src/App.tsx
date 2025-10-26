import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages';
import NotFound from './pages/NotFound';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
const App=()=> (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          limit={1}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          style={{ whiteSpace: 'nowrap', width: 'fit-content' }}
        />
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
)

export default App

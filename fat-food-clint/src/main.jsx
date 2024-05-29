import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/router';
import { HelmetProvider } from 'react-helmet-async';
import ContextProvider from './Providers/ContextProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-7xl	mx-auto w-full px-6 md:px-0 lg:px-0 md:w-11/12 lg:w-11/12'>
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </ContextProvider>

  </React.StrictMode>,
)

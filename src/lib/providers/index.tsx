'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import UserProvider from '@/context/user.provider';
import { FocusProvider } from '@/context/focus.provider';

export interface ProvidersProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <FocusProvider>
          <Toaster richColors={true} />
          {children}
        </FocusProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

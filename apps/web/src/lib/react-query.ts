import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

let displayedNetworkFailureError = false;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount) {
        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true;

            toast.error(
              'A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.',
              {
                onDismiss: () => {
                  displayedNetworkFailureError = false;
                },
              }
            );
          }

          return false;
        }

        return true;
      },
    },
  },
});

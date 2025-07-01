/** Packages */
import toast, { Toaster } from 'react-hot-toast';

export const showToastMessage = (message, type) => {
    if (type == 'success') {
        // toast.success(message);
        toast.success(message, { duration: 4000 });
    } else if (type == 'error') {
        toast.error(message, { duration: 4000 })
    }
};
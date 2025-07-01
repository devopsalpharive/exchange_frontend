/** Packages */
import toast from 'react-hot-toast';


export const showToastMessage = (message, type) => {
    if (type == 'success') {
        toast.success(message);
    } else if (type == 'error') {
        toast.error(message)
    }
};
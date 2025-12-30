import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = (title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  return MySwal.fire({
    title: `<span style="color: #002f34; font-weight: bold;">${title}</span>`,
    text: text,
    icon: icon,
    confirmButtonColor: '#002f34', 
    confirmButtonText: 'OK',
    buttonsStyling: true,
    customClass: {
      popup: 'rounded-lg border-t-4 border-[#23e5db]' 
    }
  });
};

export const showConfirm = async (title: string, text: string) => {
  const result = await MySwal.fire({
    title: `<span style="color: #002f34; font-weight: bold;">${title}</span>`,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', 
    cancelButtonColor: '#002f34', 
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });
  return result.isConfirmed;
};
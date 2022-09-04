import Swal from 'sweetalert2';

export const commonAlert = (message,type='success') => {
    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2000
    })
}
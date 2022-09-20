import Swal from 'sweetalert2';

export const commonAlert = (message,type='success') => {
    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2000
    })
}


export const prompAlert = (
        question = 'Do you want to save the changes?',
        confirmButtonText = 'Save',
        denyButtonText = `Don't save`,
        confirmed,
        denied
    ) => {
    Swal.fire({
        title: question,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
      }).then((result) => {
        if (result.isConfirmed) {
            confirmed();
        } else if(result.isDenied) {
            denied();
        }
      })
}
class LeaveController {
  constructor(mobx) {
      'ngInject';

      this.toastr = toastr;
      this.validation = {};
      this.$state = $state;
      this.$q = $q;


  }

    }

    datePickers = {
        startDate: {
            opened: false,
            open: () => {
                this.datePickers.startDate.opened = true;
            }
        },
        endDate: {
            opened: false,
            open: () => {
                this.datePickers.endDate.opened = true;
            }
        }



export default LeaveController;

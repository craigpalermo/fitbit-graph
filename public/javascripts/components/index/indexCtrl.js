angular.module('fitbit-app').controller('indexCtrl', [
  function () {
    const self = this;

    self.onUpload = function onUpload (files) {
      // TODO progress spinner or something
    };

    /**
     * Upon successful file upload, extract chart labels and data from response
     * @param res
     */
    self.onSuccess = function onSuccess (res) {
      if (res.status === 200) {
        // Extract dates to use as labels
        self.chartLabels = res.data.map(x => x.date);

        // Extract data to display
        self.chartData = [res.data.map(x => x.caloriesBurned)];
      }
    };

    /**
     * Null out chartData to allow user to upload a new file
     */
    self.reset = function reset () {
      self.chartData = null;
    };
  },
]);
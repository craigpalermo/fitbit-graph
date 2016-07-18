angular.module('fitbit-app').controller('indexCtrl', [
  function () {
    const self = this;

    self.onUpload = function onUpload (files) {
      // TODO progress spinner or something
    };

    self.onSuccess = function onSuccess (res) {
      if (res.status === 200) {
        // Extract dates to use as labels
        self.chartLabels = res.data.map(x => x.date);

        // Extract data to display
        self.chartData = [res.data.map(x => x.caloriesBurned)];
      }
    };

    self.reset = function reset () {
      self.chartData = null;
    };
  },
]);
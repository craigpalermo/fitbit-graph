angular.module('fitbit-app').controller('indexCtrl', [
  function () {
    const self = this;

    self.chartData = {};

    /**
     * Sets the selected field and updates chartData to use the values for the given field
     * @param data
     * @param fieldName
     */
    function chartDataForField(data, fieldName) {
      self.chartData[fieldName] = [data.map(x => x[fieldName])];
    }

    self.onUpload = function onUpload () {
      self.resData = false;
      self.error = false;
    };

    /**
     * Upon successful file upload, extract chart labels and data from response
     * @param res
     */
    self.onSuccess = function onSuccess (res) {
      // Extract dates to use as labels
      self.chartLabels = res.data.lines.map(x => x.date);

      // Extract data for each field
      self.resData = true;
      self.error = false;
      self.chartFields = res.data.chartConfig;

      self.chartFields.map(x => chartDataForField(res.data.lines, x.field));
    };

    /**
     * Set error flag upon failed upload
     * @param res
     */
    self.onError = function onError (res) {
      self.error = true;
    };

    /**
     * Null out chartData to allow user to upload a new file
     */
    self.reset = function reset () {
      self.resData = false;
      self.error = false;
    };
  },
]);
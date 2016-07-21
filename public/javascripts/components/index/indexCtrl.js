angular.module('fitbit-app').controller('indexCtrl', [
  function () {
    const self = this;

    self.chartFields = [
      { field: 'caloriesBurned', displayName: 'Caloried Burned' },
      { field: 'steps', displayName: 'Steps' },
      { field: 'distance', displayName: 'Distance' },
      { field: 'floors', displayName: 'Floors' },
    ];

    self.selectedField = self.chartFields[0].field;

    /**
     * Sets the selected field and updates chartData to use the values for the given field
     * @param data
     * @param fieldName
     */
    self.chartDataForField = function chartDataForField(data, fieldName) {
      self.selectedField = fieldName;
      self.chartData = [data.map(x => x[fieldName])];
    }

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

        // Extract data to display, show caloriesBurned by default
        self.responseData = res.data;
        self.chartDataForField(res.data, self.selectedField);
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
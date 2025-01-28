import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import { DateBox, NumberBox } from 'devextreme-react';
import toast from 'react-hot-toast';

function RunTimeTable({ data, setData, loading }) {
  // Function to ensure total percentage equals 100
  function validateTotalPercentage() {
    const totalPercentage = data.reduce((sum, row) => sum + row.percentage, 0);
    if (totalPercentage !== 100) {
      toast.error('إجمالي النسبة يجب أن يكون 100');
      return false;
    }
    return true;
  }
  // Function to update percentage and adjust others to maintain total 100
  function adjustPercentages(updatedIndex, updatedValue) {
    const total = data.reduce(
      (sum, row, index) =>
        index !== updatedIndex ? sum + row.percentage : sum,
      0,
    );
    const remaining = 100 - total;
    const updatedData = [...data];
    updatedData[updatedIndex].percentage = updatedValue;

    // Adjust other percentages to make the total sum 100
    let remainingRows = updatedData.filter(
      (_, index) => index !== updatedIndex,
    );
    let totalRemaining = remaining;
    remainingRows.forEach((row, index) => {
      const newPercentage = totalRemaining / remainingRows.length;
      updatedData[index].percentage = newPercentage;
      totalRemaining -= newPercentage;
    });

    setData(updatedData);
  }
  // Validate endDate is not before startDate
  function validateEndDate(e) {
    const { value, rowIndex } = e;
    const updatedData = [...data];
    const row = updatedData[rowIndex];
    const startDate = row.startDate;

    if (value < startDate) {
      toast.error('تاريخ الانتهاء لا يمكن أن يكون قبل تاريخ البدء.');
      e.cancel = true; // Prevent updating the cell if the validation fails
    }
  }

  return (
    <>
      <DataGrid
        id="DivRunTimeTable"
        dataSource={data}
        showBorders={true}
        idField="id"
        disabled={loading}>
        <Column dataField="id" caption="ID" visible={false} width={50} />
        <Column dataField="paymentTypeId" caption="نوع الدفع" />
        <Column dataField="year" caption="العام الدراسي" />
        <Column dataField="branchs" caption="الفروع" />
        <Column dataField="educationTypes" caption="نوع التعليم" />

        <Column
          dataField="percentage"
          caption="النسبة"
          editCellComponent={NumberBox}
          editorOptions={{
            min: 0,
            max: 100,
            showSpinButtons: true,
          }}
          onValueChanged={(e) => {
            const { value, rowIndex } = e;
            if (value > 100) {
              toast.error('النسبة لا يمكن أن تتجاوز 100');
              e.cancel = true;
              return;
            }
            adjustPercentages(rowIndex, value);
            if (!validateTotalPercentage()) {
              e.cancel = true;
            }
          }}
        />

        {/* Start Date column */}
        <Column
          dataField="startDate"
          caption="تاريخ البدء"
          dataType="date"
          editCellComponent={DateBox}
        />

        {/* End Date column */}
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          dataType="date"
          editCellComponent={DateBox}
          onValueChanged={validateEndDate}
        />

        <Editing
          allowUpdating={true}
          allowAdding={false}
          allowDeleting={false}
          mode="cell"
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RunTimeTable;

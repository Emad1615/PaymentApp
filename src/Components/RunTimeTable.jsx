import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import InputSpinner from 'react-bootstrap-input-spinner';

function RunTimeTable({ data, setData, loading, paymentLength }) {
  const ChartCell = (cellData) => {
    function handleChange(e) {
      const newData = data.map((item) => {
        if (item.id === cellData.data.id) {
          return { ...item, percentage: e };
        } else {
          return {
            ...item,
            percentage: (100 - e) / (paymentLength - 1),
          };
        }
      });
      setData(newData);
    }
    return (
      <InputSpinner
        type="real"
        precision={3}
        min={1}
        max={100}
        step={0.01}
        value={cellData.key.percentage}
        onChange={handleChange}
      />
    );
  };
  return (
    <>
      <DataGrid
        id="DivRunTimeTable"
        dataSource={data}
        showBorders={true}
        idField="id"
        rtlEnabled={true}
        disabled={loading}>
        <Column dataField="id" caption="ID" visible={false} width={50} />
        <Column dataField="paymentType" caption="نوع الدفع" />
        <Column dataField="year" caption="العام الدراسي" />
        <Column dataField="branchs" caption="الفروع" />
        <Column dataField="educationTypes" caption="نوع التعليم" />

        <Column
          dataField="percentage"
          caption="النسبة"
          cellRender={ChartCell}
        />
        {/* <Column
          dataField="startDate"
          caption="تاريخ البدء"
          minWidth={320}
          cellRender={ChartCell}
        />
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          minWidth={320}
          cellRender={ChartCell}
        /> */}
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RunTimeTable;

import { DataGrid } from 'devextreme-react';
import { Column, Paging } from 'devextreme-react/cjs/data-grid';

function RealTable({ loading, realData, setRealData }) {
  return (
    <>
      <DataGrid
        id="gridRealTable"
        dataSource={realData}
        showBorders={true}
        idField="id"
        disabled={loading}>
        <Column dataField="id" caption="ID" visible={false} width={50} />
        <Column dataField="paymentTypeId" caption="نوع الدفع" />
        <Column dataField="year" caption="العام الدراسي" />
        <Column dataField="branch" caption="الفرع" />
        <Column dataField="educationType" caption="نوع التعليم" />

        <Column dataField="percentage" caption="النسبة" />
        <Column dataField="startDate" caption="تاريخ البدء" dataType="date" />
        <Column dataField="endDate" caption="تاريخ الانتهاء" dataType="date" />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RealTable;

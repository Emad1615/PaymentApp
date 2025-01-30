import { DataGrid } from 'devextreme-react';
import { Column, FilterRow, GroupPanel, Pager, Paging } from 'devextreme-react/cjs/data-grid';
import { useEffect } from 'react';
import EditPaymentModal from './EditPaymentModal';

function RealTable({ loading, gridPaymentData, setGridPaymentData }) {

  useEffect(() => {
    
    console.log('logtbl:' + gridPaymentData);
    console.log(gridPaymentData);
  }, [gridPaymentData]);

  const renderCellActions = (cellData) => {
    return (
      <div style={{ display: 'flex' }}>
          <EditPaymentModal  rowData={cellData.data} gridPaymentData={gridPaymentData} setGridPaymentData={setGridPaymentData}  />
      </div>
    );
  };

  return (
    <>
      <DataGrid
        id="DivRealTable"
        dataSource={gridPaymentData}
        showBorders={true}
        rowAlternationEnabled={true}
        defaultSearchPanel={{ visible: true }}
        searchPanel={{ visible: true }}
        idField="id"
        rtlEnabled={true}
        disabled={loading}
      >
        <Pager visible={true} />
        <FilterRow visible={true} />
        <GroupPanel
          visible={true}
          allowColumnDragging={false}
        />
        <Column dataField="id" caption="الرقم التعريفي" visible={false} width={50} allowSorting={false} />

        <Column dataField="paymentTypeName" caption="نوع الدفع" groupIndex={1} allowSorting={false} />
        <Column dataField="educationYear" caption="العام الدراسي" groupIndex={0} visible={false} allowSorting={false} />
        <Column dataField="branchName" caption="الفـــروع" allowSorting={false} />
        <Column dataField="educationTypeName" caption="نـوع التعليــم" allowSorting={false} />
        <Column dataField="paymentPercentage" caption="النســبة" allowSorting={false} />
        <Column dataField="paymentNumber" caption="رقــم الدفعــة" allowSorting={false} />
        <Column dataField="paymentStartDate" caption="تاريــخ البــدء" dataType="date"   format="yyyy-MM-dd" allowSorting={false} />
        <Column dataField="paymentEndDate" caption="تاريــخ الانتهــاء" dataType="date"   format="yyyy-MM-dd" allowSorting={false} />

        <Column
          caption="الإجراءات"
          width={175}
          cellRender={renderCellActions}
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RealTable;

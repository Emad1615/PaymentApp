import { DataGrid } from 'devextreme-react';
import { Column, FilterRow, GroupPanel, Pager, Paging } from 'devextreme-react/cjs/data-grid';
import { useEffect } from 'react';
import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';
import Button from '../ui/Button';
import EditPaymentModal from './EditPaymentModal';

function RealTable({ loading, gridPaymentData, setGridPaymentData }) {

  useEffect(() => {
    
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
        <Column dataField="paymentStartDate" caption="تاريــخ البــدء" dataType="date" allowSorting={false} />
        <Column dataField="paymentEndDate" caption="تاريــخ الانتهــاء" dataType="date" allowSorting={false} />

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

{/* <Button
          disabled={loading}
          type="button"
          variation="primary"
          style={{ width: '100%' }}
          onClick={() => handleEditButtonClick(cellData.data)}  // Pass row data to the click handler
        >
          <BiSolidEdit />
          تعديل
        </Button> */}
        {/* <Button
          disabled={loading}
          type="button"
          variation="danger"
          style={{ width: '100%' }}
          onClick={() => console.log('Delete button clicked for row:', cellInfo.data)}  // You can add delete logic here
        >
          <BiSolidTrash />
          حذف
        </Button> */}
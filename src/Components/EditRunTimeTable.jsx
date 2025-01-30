import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import Input from './../ui/Input';
import { FaPercentage } from 'react-icons/fa';
import styled from 'styled-components';
import { addDays } from 'date-fns';
// import { useEffect } from 'react';
import { DateBox } from 'devextreme-react/date-box';
import 'devextreme/dist/css/dx.common.css';

const ContainerPercentageIcon = styled.div`
  // background: #6366f1;
  // color:white;
  // border: 1px solid #6366f1;
    background: #ececec;
    color: #757575;
    border: 1px solid #dddddd;
    padding: 10.3px 10px;
`;
const ContainerPer = styled.div`
display: flex;
`;
function EditRunTimeTable({ editingData, setEditingData, loading })
{
  function adjustPercentages(newData)
  {
    let totalPercentage = newData.reduce(
      (sum, item) => sum + parseFloat(item.paymentPercentage),
      0
    );

    if (totalPercentage < 100)
    {
      const deficit = (100 - totalPercentage).toFixed(2);
      newData[newData.length - 1].paymentPercentage = parseFloat((
        parseFloat(newData[newData.length - 1].paymentPercentage) + parseFloat(deficit)
      ).toFixed(2));
    }

    newData.forEach((item) =>
    {
      if (item.paymentPercentage < 1)
      {
        item.paymentPercentage = 1;
      }
    });

    return newData;
  }

//   useEffect(() =>
//   {
//    if(editingData && editingData.length > 0) 
//     setEditingData(adjustPercentages(editingData));
//   }, [editingData]);


  const percentageCell = (cellData) =>
  {
    function handleKeyDown(e)
    {
      if (e.key === 'Enter')
      {
        handleChange(e);
      }
    }

    function handleChange(e)
    {
      let newPercentage = parseFloat(Number(e.currentTarget.value).toFixed(2)); // Ensure 2 decimal places
      if (newPercentage < 1) newPercentage = 1; // Prevent percentage from being less than 1

      const newData = [...editingData];
      const index = newData.findIndex((item) => item.id === cellData.data.id);

      // Update the percentage of the current row
      newData[index] = {
        ...newData[index],
        paymentPercentage: newPercentage,
      };

      // Calculate the total percentage of all rows
      let totalPercentage = newData.reduce(
        (sum, item) => sum + parseFloat(item.paymentPercentage),
        0
      );

      // If the total percentage exceeds 100, we will need to reduce percentages to fit
      if (totalPercentage > 100)
      {
        let excess = totalPercentage - 100;
        // Distribute the excess percentage evenly by reducing from rows
        for (let i = newData.length - 1; i >= 0; i--)
        {
          if (excess > 0)
          {
            const currentValue = parseFloat(newData[i].paymentPercentage);
            const maxReduce = currentValue - 1; // Ensure no percentage goes below 1
            const reduction = Math.min(excess, maxReduce);
            newData[i].paymentPercentage = parseFloat((currentValue - reduction).toFixed(2));
            excess -= reduction;
          }
        }
      }

      // If the total percentage is less than 100, we need to increase the last row's percentage
      if (totalPercentage < 100)
      {
        let deficit = 100 - totalPercentage;
        // Distribute the deficit percentage by adding to the last row
        newData[newData.length - 1].paymentPercentage = parseFloat((
          parseFloat(newData[newData.length - 1].paymentPercentage) + deficit
        ).toFixed(2));
      }

      // Ensure no percentage is less than 1
      newData.forEach((item) =>
      {
        if (item.paymentPercentage < 1)
        {
          item.paymentPercentage = 1;
        }
      });

    setEditingData(adjustPercentages(newData));
    }

    return (
      <ContainerPer>
        <Input
          type="text"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.paymentPercentage}
          onBlur={handleChange}
          onKeyDown={handleKeyDown}
          min={1}
          max={100}
          step={0.01}
        />
        <ContainerPercentageIcon>
          <FaPercentage />
        </ContainerPercentageIcon>
      </ContainerPer>
    );
  };

  // Handle start date change
  function handleStartDateChange(e, cellData)
  {
    const selectedDate = new Date(e.value);
    const newData = [...editingData];
    const index = newData.findIndex((item) => item.id === cellData.data.id);

    // Update the startDate and endDate of the current row
    const newEndDateOfCurrentRow = addDays(selectedDate, 1).toISOString().split('T')[0];
    
    newData[index] = {
      ...newData[index],
      paymentStartDate: selectedDate.toISOString().split('T')[0],
    };

    if (newData[index].paymentEndDate <= newEndDateOfCurrentRow) {
      newData[index] = {
        ...newData[index],
        paymentEndDate: newEndDateOfCurrentRow,
      };
    }
    // Update End Date the rows before if exists
    if (index > 0) {
      const previousRow = newData[index - 1];
      const newEndDateForPreviousRow = new Date(selectedDate);
      newEndDateForPreviousRow.setDate(newEndDateForPreviousRow.getDate() - 1); 

      // Update the previous row's end date
      newData[index - 1] = {
        ...previousRow,
        paymentEndDate: newEndDateForPreviousRow.toISOString().split('T')[0],
      };
    }
    // Update the rows after the modified row
    for (let i = index + 1; i < newData.length; i++)
    {
      const newStartDate = addDays(new Date(newData[i - 1].paymentEndDate), 1).toISOString().split('T')[0];
      const newEndDate = addDays(new Date(newData[i - 1].paymentEndDate), 2).toISOString().split('T')[0];

      newData[i] = {
        ...newData[i],
        paymentStartDate: newStartDate,
      };
      if (newData[i].paymentEndDate <= newEndDate)
      {
        newData[i] = {
          ...newData[i],
          paymentEndDate: newEndDate,
        };
      }
    }

    setEditingData(newData);
  }
  // Handle end date change
  function handleEndDateChange(e, cellData)
  {
    const selectedDate = new Date(e.value);
    const newData = [...editingData];
    const index = newData.findIndex((item) => item.id === cellData.data.id);

    // Update the endDate of the current row
    newData[index] = {
      ...newData[index],
      paymentEndDate: selectedDate.toISOString().split('T')[0],
    };

    // Update the rows after the modified row
    for (let i = index + 1; i < newData.length; i++)
    {
      const newStartDate = addDays(new Date(newData[i - 1].paymentEndDate), 1).toISOString().split('T')[0];
      const newEndDate = addDays(new Date(newData[i - 1].paymentEndDate), 2).toISOString().split('T')[0];
      newData[i] = {
        ...newData[i],
        paymentStartDate: newStartDate, // Ensure startDate is 1 day after previous row's endDate
      };
      if (newData[i].paymentEndDate <= newEndDate)
      {
        newData[i] = {
          ...newData[i],
          paymentEndDate: newEndDate,
        };
      }
    }

    setEditingData(newData);
  }

  function startDateCell(cellData)
  {
    const index = editingData.findIndex((item) => item.id === cellData.data.id);
    const minDate = index === 0 ? null : addDays(new Date(editingData[index - 1].paymentEndDate), 1).toISOString().split('T')[0];
    return (
      <>
         <DateBox
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.paymentStartDate}
          onValueChanged={(e) => handleStartDateChange(e, cellData)}
          min={minDate}
          displayFormat="yyyy-MM-dd"
        />
      </>)

  }
  function endDateCell(cellData)
  {
    const index = editingData.findIndex((item) => item.id === cellData.data.id);
    const minDate = addDays(new Date(editingData[index].paymentStartDate), 1).toISOString().split('T')[0];

    return (
      <>
        <DateBox
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.paymentEndDate}
          onValueChanged={(e) => handleEndDateChange(e, cellData)}
          min={minDate}
          displayFormat="yyyy-MM-dd"
        />
      </>)

  }

  const handleDevContentReady = (e) =>
  {
    const grid = e.component;
    const dataSource = grid.option("dataSource");
    let firstPaymentType = 'لم يتم الإختيار';
    let firstYear = 'لم يتم الإختيار';
    if (!(!dataSource || dataSource.length === 0))
    {
      firstPaymentType = dataSource[0].paymentTypeName;
      firstYear = dataSource[0].educationYear;
    }
    const headerRow = grid._$element.find(".dx-datagrid-headers");
    if (!headerRow.find(".custom-header-row").length)
    {
      headerRow.append(`<div class="custom-header-row"><div class="dx-header-cell">نظــام الدفع: &nbsp;&nbsp; ${firstPaymentType} &nbsp;&nbsp;| &nbsp;&nbsp; العــام الدراسي: &nbsp;&nbsp; ${firstYear}</div></div>`);
    }
  };
  return (
    <>
      <DataGrid
        id="DivRunTimeTable"
        dataSource={editingData}
        showBorders={true}
        rowAlternationEnabled={true}
        defaultSearchPanel={{ visible: false }}
        searchPanel={{ visible: false }}
        idField="id"
        rtlEnabled={true}
        disabled={loading}
        onContentReady={handleDevContentReady} >

        <Column dataField="paymentTypeName" caption="نوع الدفع"  visible={false} allowSorting={false}  />
        <Column dataField="educationYear" caption="العام الدراسي" visible={false} allowSorting={false} />
        <Column dataField="branchName" caption="الفـــروع" minWidth={100} allowSorting={false} />
        <Column dataField="educationTypeName" caption="نـوع التعليــم" minWidth={100} allowSorting={false} />
        <Column dataField="paymentNumber" caption="رقـم الدفعــة" minWidth={100} allowSorting={false} />
        <Column
          dataField="paymentPercentage"
          caption="النســبة"
          minWidth={120}
          cellRender={percentageCell} allowSorting={false}
        />
        <Column
          dataField="paymentStartDate"
          caption="تاريــخ البــدء"
          minWidth={170}
          cellRender={startDateCell} allowSorting={false}
        />
        <Column
          dataField="paymentEndDate"
          caption="تاريــخ الانتهــاء"
          minWidth={170}
          cellRender={endDateCell} allowSorting={false}
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default EditRunTimeTable;


